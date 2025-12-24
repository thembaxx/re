"use client";

import { addDays, format } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollPickerItemProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
}

const ScrollPickerItem = ({ value, isSelected, onClick }: ScrollPickerItemProps) => (
  <button
    type="button"
    className={cn(
      "flex h-12 items-center justify-center text-lg transition-colors",
      isSelected ? "font-bold text-black" : "font-normal text-gray-400",
    )}
    onClick={onClick}
  >
    {value}
  </button>
);

interface ScrollPickerProps {
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const ScrollPicker = ({ options, selectedValue, onValueChange }: ScrollPickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemHeight = 48;

  useEffect(() => {
    if (scrollRef.current) {
      const selectedIndex = options.indexOf(selectedValue);
      if (selectedIndex !== -1) {
        scrollRef.current.scrollTop = selectedIndex * itemHeight - itemHeight * 2;
      }
    }
  }, [options, selectedValue]);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scrollTop = scrollRef.current.scrollTop;
      const index = Math.round((scrollTop + itemHeight * 2) / itemHeight);
      const newIndex = Math.max(0, Math.min(options.length - 1, index));
      const newValue = options[newIndex];
      if (newValue !== selectedValue) {
        onValueChange(newValue);
      }
      scrollRef.current.scrollTo({
        top: newIndex * itemHeight - itemHeight * 2,
        behavior: "smooth",
      });
    }
  }, [options, selectedValue, onValueChange]);

  return (
    <div className="relative flex-1">
      <div
        ref={scrollRef}
        className="no-scrollbar h-60 overflow-y-scroll scroll-smooth"
        onScroll={handleScroll}
      >
        <div className="h-24" />
        {options.map((option) => (
          <ScrollPickerItem
            key={option}
            value={option}
            isSelected={option === selectedValue}
            onClick={() => onValueChange(option)}
          />
        ))}
        <div className="h-24" />
      </div>
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 border-y border-gray-300 h-12" />
    </div>
  );
};

export function DateTimePicker({
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
}: {
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}) {
  const dateOptions = Array.from({ length: 30 }, (_, i) => {
    const date = addDays(new Date(), i);
    return {
      value: format(date, "EEE MMM d"),
      date: date,
    };
  });

  const hourOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString();
  });

  const minuteOptions = Array.from({ length: 12 }, (_, i) => {
    const minute = i * 5;
    return minute < 10 ? `0${minute}` : minute.toString();
  });

  const ampmOptions = ["AM", "PM"];

  const currentSelectedDateValue = selectedDate
    ? format(selectedDate, "EEE MMM d")
    : dateOptions[0].value;

  const [selectedHour, setSelectedHour] = useState("1");
  const [selectedMinute, setSelectedMinute] = useState("30");
  const [selectedAmPm, setSelectedAmPm] = useState("PM");

  useEffect(() => {
    if (selectedTime) {
      const [time, ampm] = selectedTime.split(" ");
      const [hour, minute] = time.split(":");
      const parsedHour = parseInt(hour, 10);
      setSelectedHour(parsedHour % 12 === 0 ? "12" : (parsedHour % 12).toString());
      setSelectedMinute(minute);
      setSelectedAmPm(ampm);
    }
  }, [selectedTime]);

  useEffect(() => {
    onTimeChange(`${selectedHour}:${selectedMinute} ${selectedAmPm}`);
  }, [selectedHour, selectedMinute, selectedAmPm, onTimeChange]);

  return (
    <div className="flex gap-2">
      <ScrollPicker
        options={dateOptions.map((d) => d.value)}
        selectedValue={currentSelectedDateValue}
        onValueChange={(value) => {
          const dateObj = dateOptions.find((d) => d.value === value)?.date;
          if (dateObj) onDateChange(dateObj);
        }}
      />
      <ScrollPicker
        options={hourOptions}
        selectedValue={selectedHour}
        onValueChange={setSelectedHour}
      />
      <ScrollPicker
        options={minuteOptions}
        selectedValue={selectedMinute}
        onValueChange={setSelectedMinute}
      />
      <ScrollPicker
        options={ampmOptions}
        selectedValue={selectedAmPm}
        onValueChange={setSelectedAmPm}
      />
    </div>
  );
}
