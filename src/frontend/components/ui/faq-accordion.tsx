"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface FAQItem {
    question: string
    answer: string
}

interface FAQAccordionProps {
    items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set())

    const toggleItem = (index: number) => {
        const newOpenItems = new Set(openItems)
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index)
        } else {
            newOpenItems.add(index)
        }
        setOpenItems(newOpenItems)
    }

    return (
        <div className="space-y-4">
            {items.map((item, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-0">
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full p-6 text-left hover:bg-gray-50/50 transition-colors"
                            aria-expanded={openItems.has(index)}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                                <div className="flex-shrink-0">
                                    {openItems.has(index) ? (
                                        <ChevronUp className="w-5 h-5 text-purple-600" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-purple-600" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {openItems.has(index) && (
                            <div className="px-6 pb-6">
                                <div className="pt-4 border-t border-gray-100">
                                    <p
                                        className="text-gray-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.answer }}
                                    />
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
