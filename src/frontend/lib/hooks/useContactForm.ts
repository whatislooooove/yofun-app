"use client"

import type React from "react"

import { useState } from "react"
import type { ContactFormData } from "../types"

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  consent: false,
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form on success
      setFormData(initialFormData)
      alert("Заявка успешно отправлена!")
    } catch (error) {
      alert("Произошла ошибка при отправке заявки")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
  }
}
