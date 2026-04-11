import type { HomeData } from "../types/home";

export const MOCK_HOME_DATA: HomeData = {
  hero: {
    title: "Smart warehouse management",
    highlight: "made simple",
    description: "Track inventory, manage deliveries, and streamline operations in one platform. Built for the kinetic speed of modern logistics.",
    cta: "Sign up",
    secondaryCta: "Start Managing Inventory"
  },
  features: [
    {
      id: '1',
      title: 'Inventory Tracking',
      value: '84,291',
      change: '+4.2%',
      description: 'Live SKU monitoring with automated cycle counting alerts.',
      icon: 'barcode_scanner',
      status: 'Active Now',
      color: 'primary'
    },
    {
      id: '2',
      title: 'Low Stock Alerts',
      value: '12 Items',
      description: 'Instant notifications for critical threshold breaches.',
      icon: 'warning',
      status: 'Attention',
      color: 'error'
    },
    {
      id: '3',
      title: 'Delivery Management',
      value: '342',
      change: 'On Time',
      description: 'End-to-end fleet coordination and last-mile tracking.',
      icon: 'local_shipping',
      status: 'In Transit',
      color: 'success'
    },
    {
      id: '4',
      title: 'Receipts & Orders',
      value: '1,054',
      change: 'Today',
      description: 'Unified workflow for inbound logistics and purchase orders.',
      icon: 'receipt_long',
      status: 'Processing',
      color: 'secondary'
    }
  ],
  dashboard: {
    title: "Powerful dashboard at a glance",
    description: "Designed for heavy data lifting. Stockify transforms complex warehouse telemetry into actionable intelligence through a focused, distraction-free interface."
  },
  benefits: [
    {
      id: '1',
      title: 'Real-time data',
      description: 'Never guess your stock levels again. Every scan, move, and shipment updates instantly across your entire digital infrastructure.',
      icon: 'update',
      points: ['Sub-second latency sync', 'IoT sensor integration']
    },
    {
      id: '2',
      title: 'Easy to use',
      description: 'Built with the operator in mind. Minimalist controls and high-contrast typography ensure efficiency even in high-pressure environments.',
      icon: 'touch_app',
      points: ['No-training interface', 'Mobile-first terminal app']
    },
    {
      id: '3',
      title: 'Secure & scalable',
      description: 'From a single locker to a global network of hubs. Enterprise-grade security and distributed architecture that grows with you.',
      icon: 'security',
      points: ['End-to-end encryption', 'Multi-region redundancy']
    }
  ],
  sliderImages: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBmzF0JkMpBzK0GD-O3Oi_fJBU4T4mdfPOdjExgvvPp923RXWSRcOfWGlbqXo-GGp25M_mceg9p9hqLWNf85etlLqZSeQw3JZzqE-qkdcrKgSY-2be042oqcjje2RtMQuzj5s_xZ6zdspDJSesrwV7gibVDqBZFp4SptWRMZ94-ReSc6BKbL8qcWKOeE1SXBb-LAcEIh4XJYgQh4uMLw5a4QQWaYdJtRxVjO1RqgBQvTFiSsJ3r0Ap_L5HieJ5Ko_W-6LXkjsu9-h8",
    "https://picsum.photos/seed/warehouse1/1200/800",
    "https://picsum.photos/seed/logistics2/1200/800",
    "https://picsum.photos/seed/inventory3/1200/800"
  ]
};