"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu, Phone, Instagram, Clock, MapPin } from "lucide-react";
import { SERVICE_CATEGORIES, NAV_LINKS } from "@/lib/site-data";
import { Logo } from "./logo";
import { useBookAppointment } from "./book-appointment-context";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setOpen: setBookOpen } = useBookAppointment();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar — quiet, editorial */}
      <div className="bg-ink text-cream/75 text-[11px]">
        <div className="container mx-auto px-4 flex h-8 items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-gold/70" />
              +977-1-4XXXXXX
            </span>
            <span className="hidden md:inline text-cream/40">·</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold/70" />
              Maharajgunj, Kathmandu
            </span>
            <span className="hidden lg:inline text-cream/40">·</span>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-gold/70" />
              Sun–Fri · 8 AM – 6 PM
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:inline text-cream/45 font-serif-body italic">
              Follow:
            </span>
            <a
              href="#social"
              aria-label="Instagram"
              className="hover:text-gold transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="#social"
              aria-label="TikTok"
              className="hover:text-gold transition-colors text-[11px] font-medium"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-border"
            : "bg-background border-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex h-16 lg:h-[4.5rem] items-center justify-between gap-4">
          <Logo />

          {/* Desktop nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#home">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#popular">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ServicesMegaMenu />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#stories">Success Stories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="#newsletter">Offers</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => setBookOpen(true)}
              variant="ghost"
              className="hidden sm:inline-flex text-ink hover:bg-brand hover:text-brand-foreground font-medium"
            >
              Book appointment
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[88vw] max-w-sm p-0 flex flex-col"
              >
                <SheetHeader className="px-5 pt-5 pb-3 border-b">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto px-2 py-3">
                  <Accordion type="multiple" className="w-full">
                    {NAV_LINKS.filter((l) => l.label !== "Our Services").map(
                      (link) => (
                        <div key={link.label} className="px-3 py-2.5">
                          <Link
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-base font-medium text-foreground/80 hover:text-brand"
                          >
                            {link.label}
                          </Link>
                        </div>
                      )
                    )}
                    <AccordionItem value="services" className="border-b-0">
                      <AccordionTrigger className="px-3 hover:no-underline text-base font-medium text-foreground/80 hover:text-brand">
                        Our Services
                      </AccordionTrigger>
                      <AccordionContent className="pb-2">
                        {SERVICE_CATEGORIES.map((cat) => (
                          <div key={cat.id} className="py-1">
                            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-brand/80 pt-2">
                              {cat.title}
                            </p>
                            {cat.services.slice(0, 5).map((s) => (
                              <Link
                                key={s.title}
                                href={s.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-3 py-1.5 text-sm text-foreground/70 hover:text-brand"
                              >
                                {s.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="border-t p-4 space-y-2">
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      setBookOpen(true);
                    }}
                    className="w-full bg-brand hover:bg-brand/90 text-brand-foreground"
                  >
                    Book appointment
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Open Sun–Fri · 8 AM – 6 PM
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

function ServicesMegaMenu() {
  return (
    <>
      <NavigationMenuTrigger>Our Services</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid w-[640px] lg:w-[760px] grid-cols-2 gap-2 p-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative rounded-lg p-3 hover:bg-secondary/60 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary">
                  { }
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand">{cat.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>
              <ul className="mt-2 space-y-0.5">
                {cat.services.slice(0, 4).map((s) => (
                  <li key={s.title}>
                    <Link
                      href={s.href}
                      className="block text-xs text-foreground/70 hover:text-brand py-0.5"
                    >
                      · {s.title}
                    </Link>
                  </li>
                ))}
                {cat.services.length > 4 && (
                  <li className="text-xs text-muted-foreground pt-0.5">
                    +{cat.services.length - 4} more
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </>
  );
}
