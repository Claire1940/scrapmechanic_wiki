import type { LucideIcon } from 'lucide-react'
import {
	BookOpen,
	Compass,
	Car,
	Hammer,
	Sprout,
	Swords,
	Puzzle,
	Rocket,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'guides', path: '/guides', icon: BookOpen, isContentType: true },
	{ key: 'survival', path: '/survival', icon: Compass, isContentType: true },
	{ key: 'builds', path: '/builds', icon: Car, isContentType: true },
	{ key: 'crafting', path: '/crafting', icon: Hammer, isContentType: true },
	{ key: 'farming', path: '/farming', icon: Sprout, isContentType: true },
	{ key: 'enemies', path: '/enemies', icon: Swords, isContentType: true },
	{ key: 'mods', path: '/mods', icon: Puzzle, isContentType: true },
	{ key: 'updates', path: '/updates', icon: Rocket, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['codes', 'build', 'combat', 'guides']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
