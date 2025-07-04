"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, GripVertical, Trash2 } from "lucide-react";
import { apiRequest } from "@/utils/request";

const MINI_ROWS = 12;

type NewsItem = {
  id: string;
  title: string;
};

function SortableItem({
  item,
  index,
  onChange,
  onRemove,
}: {
  item: NewsItem;
  index: number;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 bg-white border rounded shadow-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400"
      >
        <GripVertical size={18} />
      </button>
      <span className="text-gray-500 w-5 text-right">{index + 1}</span>
      <Input
        value={item.title}
        onChange={(e) => onChange(item.id, e.target.value)}
        placeholder="请输入标题"
        className="flex-1"
      />
      {index >= MINI_ROWS && (
        <button onClick={() => onRemove(item.id)} className="text-red-500">
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );
}

export default function NewsListEditor() {
  const [newsList, setNewsList] = useState<NewsItem[]>(
    Array.from({ length: MINI_ROWS }, (_, i) => ({
      id: `init-${i + 1}`,
      title: "",
    }))
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = newsList.findIndex((i) => i.id === active.id);
      const newIndex = newsList.findIndex((i) => i.id === over?.id);
      setNewsList(arrayMove(newsList, oldIndex, newIndex));
    }
  };

  const handleAdd = () => {
    const id = `new-${Date.now()}`;
    setNewsList((prev) => [...prev, { id, title: "" }]);
  };

  const handleRemove = (id: string) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleChange = (id: string, value: string) => {
    setNewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleSave = async () => {
    const cleaned = newsList
      .filter((i) => i.title.trim())
      .map((item, i) => ({
        title: item.title,
        order: i + 1,
      }));

    try {
      const res = await apiRequest("/api/proxy?path=/api/daily_news/create", {
        newsList: cleaned,
      });
      console.log("res", res);
      alert("保存成功");
    } catch (e) {
      console.error(e);
      alert("保存失败");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4 border rounded-xl shadow bg-gray-50">
      <h2 className="text-xl font-semibold">编辑每日新闻</h2>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={newsList.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {newsList.map((item, index) => (
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                onChange={handleChange}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-1" />
          添加新闻
        </Button>
        <Button onClick={handleSave}>保存</Button>
      </div>
    </div>
  );
}
