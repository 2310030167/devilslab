"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const testimonials = [
    {
        quote: "DevilsLab transformed our abstract AI concept into a market-ready platform. Their technical expertise and strategic guidance were invaluable. They are more than developers; they are true innovation partners.",
        clientName: "Sarah Chen",
        clientTitle: "CEO, Legal Lens AI",
        headshotId: "client-sarah"
    },
    {
        quote: "The process of building our Web3 ecosystem was incredibly complex, but the DevilsLab team navigated every challenge with professionalism and skill. The final product exceeded all our expectations.",
        clientName: "Michael Lee",
        clientTitle: "Founder, SyncGalaxy",
        headshotId: "client-michael"
    },
    {
        quote: "Working with DevilsLab felt like an extension of our own team. Their commitment to quality and their agile approach kept the project on track and aligned with our vision from start to finish.",
        clientName: "Jessica Brown",
        clientTitle: "Product Manager, Future Corp",
        headshotId: "client-jessica"
    }
]

export default function TestimonialsSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <section id="testimonials" className="py-24 md:py-32 px-4 md:px-8 bg-gray-50">
        <p className="section-subtitle">Our clients' success is our greatest metric. Here's what they have to say.</p>
        
        <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-4xl mx-auto mt-12"
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {testimonials.map((testimonial, index) => {
                    const headshot = PlaceHolderImages.find(p => p.id === testimonial.headshotId);
                    return (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-xl border border-gray-200/80 relative">
                                    <span className="absolute top-8 left-8 text-7xl font-bold text-primary opacity-5 select-none">“</span>
                                    <p className="text-xl md:text-2xl font-medium text-primary leading-snug max-w-3xl mx-auto mb-8 relative">
                                        {testimonial.quote}
                                    </p>
                                    <div className="flex flex-col items-center justify-center">
                                        {headshot && (
                                            <Image
                                                src={headshot.imageUrl}
                                                alt={`Headshot of ${testimonial.clientName}`}
                                                width={64}
                                                height={64}
                                                className="rounded-full mb-4 border-2 border-primary/10 shadow-md"
                                                data-ai-hint={headshot.imageHint}
                                            />
                                        )}
                                        <div className="text-center">
                                            <strong className="block text-lg font-semibold text-primary">{testimonial.clientName}</strong>
                                            <span className="text-muted-foreground">{testimonial.clientTitle}</span>
                                        </div>
                                    </div>
                                    <span className="absolute bottom-8 right-8 text-7xl font-bold text-primary opacity-5 select-none">”</span>
                                </div>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            <CarouselDots />
        </Carousel>
    </section>
  )
}
