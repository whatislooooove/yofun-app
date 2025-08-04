import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants"
import {getStaticData} from "@/lib/api";

export default async function Footer({totalEventsCount = false}: {
  totalEventsCount?: number | boolean;
}) {
  const staticData = (totalEventsCount === false) ? (await getStaticData()).totalEvents : totalEventsCount

  return (
      <footer className="relative bg-indigo-950 pt-20 pb-8">
        <div className="absolute top-0 left-0 right-0 h-16">
          <svg
              className="absolute bottom-0 w-full h-16"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,20 C300,100 900,60 1200,20 L1200,120 L0,120 Z" fill="#1e1b4b" className="opacity-90"/>
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#312e81"/>
                <stop offset="25%" stopColor="#7c3aed"/>
                <stop offset="75%" stopColor="#ec4899"/>
                <stop offset="100%" stopColor="#312e81"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div
                    className="w-20 from-purple-600 to-pink-600 flex items-center justify-center">
                  <img src="/logo.svg" alt="Логотип сайта"/>
                </div>
                <span className="text-white text-xl font-bold">yofun</span>
              </div>
              <p className="text-purple-300 mb-6">
                Ваш путеводитель по самым интересным событиям Йошкар-Олы. Концерты, выставки, квизы и многое другое.
              </p>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                    <Link
                        key={social.name}
                        href={social.url}
                        className="w-10 h-10 bg-purple-800/30 hover:bg-purple-600/50 rounded-full flex items-center justify-center transition-colors"
                    >
                      {social.name === "facebook" && <Facebook className="w-5 h-5 text-purple-300"/>}
                      {social.name === "instagram" && <Instagram className="w-5 h-5 text-purple-300"/>}
                      {social.name === "twitter" && <Twitter className="w-5 h-5 text-purple-300"/>}
                      {social.name === "youtube" && <Youtube className="w-5 h-5 text-purple-300"/>}
                    </Link>
                ))}
              </div>
            </div>

            {FOOTER_LINKS.map((section) => (
                <div key={section.title}>
                  <h3 className="text-white font-bold mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                        <li key={link.label}>
                          <Link href={link.url} className="text-purple-300 hover:text-white transition-colors">
                            {link.label}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
            ))}

            <div>
              <h3 className="text-white font-bold mb-6">Подписка на новости</h3>
              <p className="text-purple-300 mb-4">Будьте в курсе новых мероприятий и специальных предложений</p>
              <div className="flex space-x-2">
                <Input
                    placeholder="Ваш email"
                    className="bg-white/10 border-purple-500/30 text-white placeholder:text-purple-300 rounded-xl"
                />
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl">OK</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-800/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-400 text-sm mb-4 md:mb-0">© 2025 yofun. Все права защищены.</p>
            <p className="text-purple-500 text-sm mb-4 md:mb-0">{staticData === 0
                ? ''
                : 'Всего в нашей базе ' + staticData + ' актуальных мероприятий'}</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-purple-400 hover:text-white text-sm transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="text-purple-400 hover:text-white text-sm transition-colors">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}
