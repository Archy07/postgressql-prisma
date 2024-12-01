import { Product, ProductQuery, ProductsQuery } from '@repo/schemas';
import { prisma } from '../../lib/PrismaClient';
import type { Prisma } from '@repo/db';
export class ProductsService {
  async list({ collection, sort, q }: ProductsQuery): Promise<Product[]> {
    const where: Prisma.ProductFindManyArgs['where'] = {};
    if (collection) {
      where.collections = {
        some: {
          id: collection,
        },
      };
    }
    if (q) {
      where.name = {
        contains: `'${q.replace(/[^a-zA-Z0-9\s]/g, '')}'`,
      };
    }
    const result = await prisma.product.findMany({
      where,
      include: {
        variants: {
          take: 1,
          select: { price: true },
          orderBy: { price: 'asc' },
        },
      },
    });
    const items = result.map((item) => {
      const price = item.variants.length > 0 ? item.variants[0].price : 0;
    
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
        price: Number(price.toString()),
      };
    });
    if (sort === 'price-asc') {
      items.sort((a, b) => (Number(a.price.toString()) ?? Infinity) - (Number(b.price.toString()) ?? Infinity));
    }
    
    if (sort === 'price-desc') {
      items.sort((a, b) => (Number(b.price.toString()) ?? -Infinity) - (Number(a.price.toString()) ?? -Infinity));
    }
    return items;
  }
  async get({ id }: ProductQuery): Promise<Product | null> {
    const item = await prisma.product.findFirst({
      where: { id },
      include: {
        variants: {
          orderBy: { price: 'asc' },
        },
      },
    });
    if (!item) {
      return null;
    }
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: Number(item.variants[0].price.toString()),
    };
  }
}