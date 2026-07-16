"use client";

import { Suspense, lazy } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Beaker,
  BookOpen,
  Bot,
  Boxes,
  Bug,
  Car,
  Check,
  ChefHat,
  Clock,
  Cog,
  Code2,
  Coins,
  Compass,
  Cpu,
  Drill,
  Droplet,
  ExternalLink,
  Flame,
  FlaskConical,
  Gamepad2,
  Globe,
  Hammer,
  Landmark,
  ListChecks,
  Map as MapIcon,
  MapPin,
  Mountain,
  Package,
  Palette,
  Pickaxe,
  Puzzle,
  Rocket,
  ShieldCheck,
  Ship,
  Shirt,
  Sparkles,
  Sprout,
  Swords,
  Target,
  Tractor,
  TreePine,
  Trees,
  Trash2,
  Truck,
  Users2,
  Warehouse,
  Waves,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// 模块标题区（eyebrow 徽章 + 标题 + 简介）—— 各 section 仍独立渲染，此处仅为展示辅助
function ModuleHeader({
  icon: Icon,
  eyebrow,
  title,
  intro,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="text-center mb-8 md:mb-12 scroll-reveal">
      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
        <Icon className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-wide">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
        {intro}
      </p>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.scrapmechanic.wiki";

  // 各卡片网格的图标（同一网格内互不相同）
  const featureIcons = [Drill, Mountain, Bot, Swords, Wrench, Palette];
  const locationIcons = [Wrench, Package, Coins, Warehouse, Landmark, Trees, Drill];
  const stationIcons = [Hammer, Cog, Beaker, ChefHat, Shirt];
  const blueprintIcons = [Car, Truck, TreePine, Pickaxe, Ship, Cpu];
  const botIcons = [
    Bug, Wheat, Target, Tractor, Pickaxe, Zap, Waves, Flame, Droplet, Trash2,
  ];
  const workshopIcons = [Package, Boxes, Globe, Gamepad2, Users2, ShieldCheck, Code2];

  // Tools Grid 卡片锚点（与 8 个 section id 一一对应）
  const sectionIds = [
    "drillingThunderRelease",
    "beginnerGuide",
    "survivalMap",
    "craftingRecipes",
    "vehiclesAndBuilding",
    "farmingAndRaid",
    "botsAndCombat",
    "modsAndWorkshop",
  ];

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Scrap Mechanic Wiki",
        description:
          "Complete Scrap Mechanic Wiki covering survival, vehicle builds, crafting recipes, Farmbots, mods, and the 1.0 Drilling Thunder update for the physics-driven sandbox on Steam.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Scrap Mechanic - Physics-Driven Survival Sandbox",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Scrap Mechanic Wiki",
        alternateName: "Scrap Mechanic",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Scrap Mechanic Wiki - Physics-Driven Survival Sandbox",
        },
        sameAs: [
          "https://store.steampowered.com/app/387990/Scrap_Mechanic/",
          "https://www.scrapmechanic.com/",
          "https://x.com/ScrapMechanic",
          "https://www.youtube.com/@Axolotgames",
          "https://www.reddit.com/r/ScrapMechanic/",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Scrap Mechanic",
        gamePlatform: ["PC", "Steam"],
        applicationCategory: "Game",
        genre: ["Survival", "Sandbox", "Building"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 8,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/387990/Scrap_Mechanic/",
        },
      },
      {
        "@type": "VideoObject",
        name: "Scrap Mechanic: 1.0 & Drilling Thunder - Release Date Trailer",
        description:
          "Official Scrap Mechanic 1.0 & Drilling Thunder release date trailer from Axolot Games.",
        uploadDate: "2026-07-16",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/cnweUJ8rDNA",
        url: "https://www.youtube.com/watch?v=cnweUJ8rDNA",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <a
                href="https://www.scrapmechanic.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/387990/Scrap_Mechanic/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 区域之后（容器上限 max-w-5xl，避免挤压广告） */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="cnweUJ8rDNA"
              title="Scrap Mechanic: 1.0 & Drilling Thunder - Release Date Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（位于视频区之后、Latest Updates 之前） */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = sectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Updates Section（保留模板的最近文章手风琴） */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Scrap Mechanic 1.0 Release Date and Drilling Thunder */}
      <section id="drillingThunderRelease" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Rocket}
            eyebrow={t.modules.drillingThunderRelease.eyebrow}
            title={t.modules.drillingThunderRelease.title}
            intro={t.modules.drillingThunderRelease.intro}
          />

          {/* Timeline */}
          <div className="scroll-reveal relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-6 md:space-y-8 mb-10 md:mb-12">
            {t.modules.drillingThunderRelease.timeline.map(
              (entry: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[1.6rem] md:-left-[2.1rem] w-4 h-4 rounded-full bg-[hsl(var(--nav-theme))] border-2 border-background" />
                  <div className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        {entry.date}
                      </span>
                      <h3 className="font-bold text-base md:text-lg">{entry.title}</h3>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Feature cards */}
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.drillingThunderRelease.features.map(
              (feature: any, index: number) => {
                const FeatureIcon = featureIcons[index % featureIcons.length];
                return (
                  <div
                    key={index}
                    className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                        <FeatureIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <h3 className="font-bold">{feature.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Module 2: Scrap Mechanic Beginner Guide */}
      <section id="beginnerGuide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Compass}
            eyebrow={t.modules.beginnerGuide.eyebrow}
            title={t.modules.beginnerGuide.title}
            intro={t.modules.beginnerGuide.intro}
          />

          {/* Steps */}
          <div className="scroll-reveal space-y-3 md:space-y-4 mb-8 md:mb-10">
            {t.modules.beginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <BookOpen className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="space-y-2">
              {t.modules.beginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 3: Scrap Mechanic Survival Map and Locations */}
      <section id="survivalMap" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={MapIcon}
            eyebrow={t.modules.survivalMap.eyebrow}
            title={t.modules.survivalMap.title}
            intro={t.modules.survivalMap.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:mb-10">
            {t.modules.survivalMap.locations.map((loc: any, index: number) => {
              const LocIcon = locationIcons[index % locationIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                      <LocIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {loc.type}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                    {loc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{loc.description}</p>
                </div>
              );
            })}
          </div>

          {/* Recommended route */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Recommended Exploration Route</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {t.modules.survivalMap.routeSteps.map((step: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 bg-white/5 border border-border rounded-lg"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Scrap Mechanic Crafting Recipes and Craftbots */}
      <section id="craftingRecipes" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={FlaskConical}
            eyebrow={t.modules.craftingRecipes.eyebrow}
            title={t.modules.craftingRecipes.title}
            intro={t.modules.craftingRecipes.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 md:mb-10">
            {t.modules.craftingRecipes.stations.map((station: any, index: number) => {
              const StationIcon = stationIcons[index % stationIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center">
                      <StationIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                      {station.role}
                    </span>
                  </div>
                  <h3 className="font-bold mb-2">{station.name}</h3>
                  <p className="text-sm text-muted-foreground">{station.description}</p>
                </div>
              );
            })}
          </div>

          {/* Component priorities */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Component Kit Priorities</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {t.modules.craftingRecipes.componentPriorities.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 5: Scrap Mechanic Vehicles and Building Guide */}
      <section id="vehiclesAndBuilding" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Car}
            eyebrow={t.modules.vehiclesAndBuilding.eyebrow}
            title={t.modules.vehiclesAndBuilding.title}
            intro={t.modules.vehiclesAndBuilding.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {t.modules.vehiclesAndBuilding.blueprints.map((bp: any, index: number) => {
              const BlueprintIcon = blueprintIcons[index % blueprintIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center flex-shrink-0">
                      <BlueprintIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg leading-tight">{bp.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{bp.bestFor}</p>
                    </div>
                  </div>

                  {/* Core parts */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <Cog className="w-3.5 h-3.5" /> Core Parts
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {bp.coreParts.map((part: string, pi: number) => (
                        <span
                          key={pi}
                          className="text-xs px-2 py-1 rounded-md bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.2)]"
                        >
                          {part}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Build steps */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <ListChecks className="w-3.5 h-3.5" /> Build Steps
                    </div>
                    <ol className="space-y-1.5">
                      {bp.buildSteps.map((step: string, si: number) => (
                        <li key={si} className="flex items-start gap-2 text-sm">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.4)] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--nav-theme-light))]">
                            {si + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tuning */}
                  <div className="mb-3 p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                    <div className="flex items-center gap-1.5 mb-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))]">
                      <Check className="w-3.5 h-3.5" /> Tuning
                    </div>
                    <p className="text-xs text-muted-foreground">{bp.tuning}</p>
                  </div>

                  {/* Failure checks */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">
                      <AlertTriangle className="w-3.5 h-3.5" /> Failure Checks
                    </div>
                    <ul className="space-y-1">
                      {bp.failureChecks.map((fc: string, fi: number) => (
                        <li key={fi} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                          <span className="text-red-400 mt-0.5">•</span>
                          {fc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 6: Scrap Mechanic Farming and Raid Defense */}
      <section id="farmingAndRaid" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Sprout}
            eyebrow={t.modules.farmingAndRaid.eyebrow}
            title={t.modules.farmingAndRaid.title}
            intro={t.modules.farmingAndRaid.intro}
          />

          <div className="scroll-reveal space-y-3 md:space-y-4">
            {t.modules.farmingAndRaid.stages.map((stage: any, index: number) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.15)] border border-[hsl(var(--nav-theme)/0.3)]">
                    <Sprout className="w-3.5 h-3.5 text-[hsl(var(--nav-theme-light))]" />
                    {stage.stage}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-border text-muted-foreground">
                    {stage.system}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p className="text-sm mb-3">{stage.whatToDo}</p>
                    <div className="p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                      <p className="text-xs text-muted-foreground">{stage.keyData}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-amber-400 mb-0.5">Raid Risk</p>
                        <p className="text-xs text-muted-foreground">{stage.raidRisk}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))] mb-0.5">Defense Upgrade</p>
                        <p className="text-xs text-muted-foreground">{stage.defenseUpgrade}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Module 7: Scrap Mechanic Bots and Combat Guide */}
      <section id="botsAndCombat" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Swords}
            eyebrow={t.modules.botsAndCombat.eyebrow}
            title={t.modules.botsAndCombat.title}
            intro={t.modules.botsAndCombat.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.botsAndCombat.bots.map((bot: any, index: number) => {
              const BotIcon = botIcons[index % botIcons.length];
              const isNew = /version 1\.0/i.test(bot.status);
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center flex-shrink-0">
                        <BotIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <h3 className="font-bold text-sm md:text-base leading-tight">{bot.name}</h3>
                    </div>
                  </div>
                  <span
                    className={`self-start text-xs px-2 py-1 rounded-full border mb-3 ${
                      isNew
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-400"
                        : "bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]"
                    }`}
                  >
                    {bot.status}
                  </span>

                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-semibold text-foreground">Attack: </span>
                    {bot.attackType}
                  </p>

                  <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Found In</p>
                    <div className="flex flex-wrap gap-1">
                      {bot.dangerousLocations.map((loc: string, li: number) => (
                        <span key={li} className="text-xs px-1.5 py-0.5 rounded bg-white/5 border border-border">
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Drops</p>
                    <div className="flex flex-wrap gap-1">
                      {bot.notableDrops.map((drop: string, di: number) => (
                        <span key={di} className="text-xs px-1.5 py-0.5 rounded bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.2)]">
                          {drop}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Best Weapons</p>
                    <p className="text-xs text-muted-foreground">{bot.recommendedWeapons.join(", ")}</p>
                  </div>

                  <div className="mt-auto p-3 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))] mb-1">Strategy</p>
                    <p className="text-xs text-muted-foreground">{bot.combatStrategy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 8: Scrap Mechanic Mods and Steam Workshop */}
      <section id="modsAndWorkshop" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            icon={Puzzle}
            eyebrow={t.modules.modsAndWorkshop.eyebrow}
            title={t.modules.modsAndWorkshop.title}
            intro={t.modules.modsAndWorkshop.intro}
          />

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {t.modules.modsAndWorkshop.workshop.map((item: any, index: number) => {
              const WorkshopIcon = workshopIcons[index % workshopIcons.length];
              return (
                <div
                  key={index}
                  className="p-5 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center flex-shrink-0">
                      <WorkshopIcon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base md:text-lg leading-tight">{item.name}</h3>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{item.whatItAdds}</p>

                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <ListChecks className="w-3.5 h-3.5" /> Installation
                    </div>
                    <ol className="space-y-1">
                      {item.installation.map((step: string, si: number) => (
                        <li key={si} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[hsl(var(--nav-theme)/0.2)] flex items-center justify-center text-[9px] font-bold text-[hsl(var(--nav-theme-light))]">
                            {si + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="mb-3 flex items-start gap-2">
                    <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{item.compatibility}</p>
                  </div>

                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{item.precautions}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.reddit.com/r/ScrapMechanic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ScrapMechanic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@Axolotgames"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/387990/Scrap_Mechanic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
