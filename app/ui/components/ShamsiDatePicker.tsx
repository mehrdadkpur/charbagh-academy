'use client'

import React, { useState, useEffect } from 'react'
import jalaali from 'jalaali-js'

interface ShamsiProps {
  onChange?: (date: string) => void
  initialDate: Date
}

interface SelectedDate {
  year: string
  month: string
  day: string
}

const ShamsiDatePicker = ({ onChange, initialDate }: ShamsiProps) => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(() => {
    const { jy, jm, jd } = jalaali.toJalaali(initialDate)
    return {
      year: jy.toString(),
      month: jm.toString(),
      day: jd.toString(),
    }
  })

  useEffect(() => {
    const { jy, jm, jd } = jalaali.toJalaali(initialDate)
    setSelectedDate({
      year: jy.toString(),
      month: jm.toString(),
      day: jd.toString(),
    })
  }, [initialDate])

  const startYear = 1300
  const endYear = 1404
  const months = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i)

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const updatedDate = { ...selectedDate, [name]: value }
    setSelectedDate(updatedDate)

    if (updatedDate.year && updatedDate.month && updatedDate.day) {
      const { gy, gm, gd } = jalaali.toGregorian(
        parseInt(updatedDate.year, 10),
        parseInt(updatedDate.month, 10),
        parseInt(updatedDate.day, 10)
      )
      const gregorianDate = `${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`

      if (onChange) {
        onChange(gregorianDate)
      }
    }
  }

  return (
    <div className="w-full flex gap-x-2">
      <div className="w-full">
        <select
          onChange={handleDateChange}
          name="day"
          className="w-full h-12 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          required
          value={selectedDate.day}
        >
          <option value="">روز</option>
          {days.map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <select
          onChange={handleDateChange}
          name="month"
          className="w-full h-12 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          required
          value={selectedDate.month}
        >
          <option value="">ماه</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
          ))}
        </select>
      </div>
      <div className="w-full">
        <select
          onChange={handleDateChange}
          name="year"
          className="w-full h-12 border p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
          required
          value={selectedDate.year}
        >
          <option value="">سال</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ShamsiDatePicker
