export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    slug: "best-places-to-buy-property-nairobi",
    title: "Best Places to Buy Property in Nairobi in 2026",
    excerpt:
      "From the leafy suburbs of Lavington to the bustling energy of Kilimani, discover the most promising neighbourhoods for property investment in Nairobi.",
    content: `
Nairobi's property market continues to evolve, with certain neighbourhoods consistently outperforming others. Whether you're a first-time buyer or an experienced investor, understanding the landscape is key.

## Lavington

Lavington remains one of Nairobi's most desirable residential areas. Known for its tree-lined streets and proximity to top schools, it offers a blend of tranquillity and convenience. Developments like Blossom Ivy are raising the bar for modern apartment living in the area.

## Kilimani

Kilimani has transformed into a premium urban hub. With excellent infrastructure, dining, and nightlife, it attracts young professionals and expatriates. Properties here command strong rental yields, often between 7-10% annually.

## Westlands

As Nairobi's commercial heart, Westlands offers excellent returns for rental investments. The area's mix of offices, restaurants, and residential towers makes it ideal for buy-to-let investors.

## Kiambu

For those seeking more space, Kiambu offers larger plots and family homes at competitive prices. Its proximity to Nairobi makes it increasingly popular with families wanting a suburban lifestyle.
    `,
    image: "/images/journal/nairobi-skyline.jpg",
    category: "Investment",
    author: "Wande Realty",
    date: "2026-02-15",
    readTime: "5 min read",
  },
  {
    slug: "off-plan-vs-completed-apartments",
    title: "Off-Plan vs Completed: Which Is the Smarter Investment?",
    excerpt:
      "We break down the pros and cons of buying off-plan versus ready-to-move-in apartments in Kenya's property market.",
    content: `
One of the biggest decisions property buyers face is whether to purchase off-plan or opt for a completed unit. Both have distinct advantages.

## Off-Plan Advantages

Off-plan properties are typically priced 15-30% below their completed market value. This built-in discount is a powerful tool for capital appreciation. Developers also offer flexible payment plans, spreading costs over the construction period.

## Completed Property Advantages

With a completed property, what you see is what you get. There's no construction risk, and you can begin earning rental income immediately. Financing through bank mortgages is also more straightforward.

## Our Recommendation

For investors with a medium-term horizon (2-3 years), off-plan offers the best value. For those needing immediate occupancy or rental income, completed properties are the safer choice.
    `,
    image: "/images/journal/construction.jpg",
    category: "Guide",
    author: "Wande Realty",
    date: "2026-01-28",
    readTime: "4 min read",
  },
  {
    slug: "diaspora-investment-guide",
    title: "Property Investment Guide for Kenyans in the Diaspora",
    excerpt:
      "A comprehensive guide for Kenyans living abroad who want to invest in property back home. From legal requirements to financing options.",
    content: `
Investing in Kenyan real estate from abroad has become increasingly accessible. Here's everything you need to know.

## Legal Framework

Kenyans in the diaspora have full rights to own property in Kenya. The process is straightforward, though it's advisable to work with a reputable law firm for conveyancing.

## Financing Options

Several Kenyan banks offer diaspora mortgages. Interest rates typically range from 12-14% per annum. Developer payment plans offer an alternative, often requiring a 10-30% deposit with the balance spread over 12-24 months.

## Due Diligence

Always verify the developer's track record. Request copies of the title deed, county approvals, and building permits. A site visit — either in person or via a trusted agent — is essential.

## Tax Considerations

Rental income in Kenya is taxed at a flat rate of 7.5% for residential property under the simplified tax regime. Capital gains tax on property disposal is 15%.
    `,
    image: "/images/journal/diaspora.jpg",
    category: "Diaspora",
    author: "Wande Realty",
    date: "2026-01-10",
    readTime: "6 min read",
  },
  {
    slug: "top-luxury-apartments-nairobi",
    title: "Top 5 Luxury Apartment Developments in Nairobi",
    excerpt:
      "Explore the finest luxury apartment developments currently available in Nairobi, from penthouses in Kilimani to garden apartments in Lavington.",
    content: `
Nairobi's luxury property market is maturing, with developments that rival international standards. Here are our top picks.

## 1. Azure Crest — Kilimani

A landmark tower offering panoramic views and world-class amenities. The penthouse collection is among the finest in the city.

## 2. Blossom Ivy — Lavington

A mid-rise development that prioritises green living. Each apartment is designed to maximise natural light and cross-ventilation.

## 3. The Watermark — Upper Hill

Floor-to-ceiling glass, smart home technology, and a rooftop infinity pool define this premium development.

## 4. Serene Heights — Karen

Villa-style apartments set on expansive grounds in Karen. Ideal for families who want luxury with privacy.

## 5. Metro Gardens — Westlands

A mixed-use development combining residential luxury with retail and dining at your doorstep.
    `,
    image: "/images/journal/luxury-apartments.jpg",
    category: "Lifestyle",
    author: "Wande Realty",
    date: "2025-12-20",
    readTime: "4 min read",
  },
];
