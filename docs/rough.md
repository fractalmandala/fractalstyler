# rough types

```


// State & indicators
export const CHECK_STATES = ['checked', 'unchecked', 'indeterminate'] as const;
export type CheckState = (typeof CHECK_STATES)[number];

export const RADIO_STATES = ['checked', 'unchecked'] as const;
export type RadioState = (typeof RADIO_STATES)[number];

// Triggers & animations
export const TEXT_ANIMATION_TRIGGERS = ['hover', 'click', 'mount'] as const;
export type TextAnimationTrigger = (typeof TEXT_ANIMATION_TRIGGERS)[number];

export const SWIPE_DIRECTIONS = ['left', 'right'] as const;
export type SwipeDirection = (typeof SWIPE_DIRECTIONS)[number];

export const CONFETTI_SHAPES = ['rect', 'circle'] as const;
export type ConfettiShape = (typeof CONFETTI_SHAPES)[number];

// Positioning & placement
export const POPOVER_PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;
export type PopoverPlacement = (typeof POPOVER_PLACEMENTS)[number];

export const TOOLTIP_POSITIONS = ['top', 'bottom'] as const;
export type TooltipPosition = (typeof TOOLTIP_POSITIONS)[number];

export const TOAST_POSITIONS = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const;
export type ToastPosition = (typeof TOAST_POSITIONS)[number];

export const TOAST_STATUSES = ['neutral', 'info', 'loading', 'success', 'error'] as const;
export type ToastStatus = (typeof TOAST_STATUSES)[number];

export const TOAST_PLACEMENTS = ['static', 'fixed', 'absolute'] as const;
export type ToastPlacement = (typeof TOAST_PLACEMENTS)[number];

export const DRAWER_SIDES = ['left', 'right'] as const;
export type DrawerSide = (typeof DRAWER_SIDES)[number];

export const MARQUEE_DIRECTIONS = ['left', 'right'] as const;
export type MarqueeDirection = (typeof MARQUEE_DIRECTIONS)[number];

export const COOKIE_CONSENT_POSITIONS = ['bottom-right', 'bottom-left', 'bottom-center'] as const;
export type CookieConsentPosition = (typeof COOKIE_CONSENT_POSITIONS)[number];

export const COOKIE_CONSENT_DECISIONS = ['accepted', 'rejected'] as const;
export type CookieConsentDecision = (typeof COOKIE_CONSENT_DECISIONS)[number];

// Layout & alignment
export const ORIENTATIONS = ['horizontal', 'vertical'] as const;
export type Orientation = (typeof ORIENTATIONS)[number];

export const MENU_ALIGNS = ['start', 'end'] as const;
export type MenuAlign = (typeof MENU_ALIGNS)[number];

export const TEXT_ALIGNS = ['left', 'center', 'right'] as const;
export type TextAlign = (typeof TEXT_ALIGNS)[number];

export const SORT_DIRECTIONS = ['asc', 'desc'] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export const BANNER_LAYOUTS = ['inline', 'stacked'] as const;
export type BannerLayout = (typeof BANNER_LAYOUTS)[number];

export const NAVIGATION_EDGES = ['first', 'last'] as const;
export type NavigationEdge = (typeof NAVIGATION_EDGES)[number];

// Controls & behaviors
export const BUTTON_TYPES = ['button', 'submit', 'reset'] as const;
export type ButtonType = (typeof BUTTON_TYPES)[number];

export const BUTTON_VARIANTS = [...VARIANTS] as const;
export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];

export const BUTTON_SIZES = [...SIZES, 'icon-sm', 'icon', 'icon-lg'] as const;
export type ButtonSize = (typeof BUTTON_SIZES)[number];

export const BUTTON_SHAPES = [...SHAPES] as const;
export type ButtonShape = (typeof BUTTON_SHAPES)[number];

export const ICON_BUTTON_VARIANTS = [...VARIANTS, 'solid'] as const;
export type IconButtonVariant = (typeof ICON_BUTTON_VARIANTS)[number];

export const BUTTON_GROUP_VARIANTS = ['default', 'segmented'] as const;
export type ButtonGroupVariant = (typeof BUTTON_GROUP_VARIANTS)[number];

export const BADGE_VARIANTS = [...BANNER_VARIANTS, 'neutral', 'accent'] as const;
export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const SELECTION_TYPES = ['single', 'multiple'] as const;
export type SelectionType = (typeof SELECTION_TYPES)[number];

export const LINK_TARGETS = ['_blank', '_self', '_parent', '_top'] as const;
export type LinkTarget = (typeof LINK_TARGETS)[number];

// Menu & context menu
export const CONTEXT_MENU_ITEM_TONES = ['default', 'destructive'] as const;
export type ContextMenuItemTone = (typeof CONTEXT_MENU_ITEM_TONES)[number];

export const OPEN_MODALITIES = ['pointer', 'keyboard', 'touch'] as const;
export type OpenModality = (typeof OPEN_MODALITIES)[number];

export const MENU_ITEM_ROLES = ['menuitem', 'menuitemcheckbox', 'menuitemradio'] as const;
export type MenuItemRole = (typeof MENU_ITEM_ROLES)[number];

// Animated sidebar
export const SIDEBAR_STATES = ['expanded', 'collapsed'] as const;
export type SidebarState = (typeof SIDEBAR_STATES)[number];

export const SIDEBAR_SIDES = ['left', 'right'] as const;
export type SidebarSide = (typeof SIDEBAR_SIDES)[number];

export const SIDEBAR_VARIANTS = ['sidebar', 'floating', 'inset'] as const;
export type SidebarVariant = (typeof SIDEBAR_VARIANTS)[number];

export const SIDEBAR_COLLAPSIBLES = ['offcanvas', 'icon', 'none'] as const;
export type SidebarCollapsible = (typeof SIDEBAR_COLLAPSIBLES)[number];

// Morphing primitives
export const MORPH_SIDES = ['top', 'bottom'] as const;
export type MorphSide = (typeof MORPH_SIDES)[number];

export const MORPH_ALIGNS = ['start', 'end'] as const;
export type MorphAlign = (typeof MORPH_ALIGNS)[number];
```