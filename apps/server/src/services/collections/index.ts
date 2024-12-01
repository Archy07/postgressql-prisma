import { Collection } from '@repo/schemas';
import { prisma } from '../../lib/PrismaClient';
export class CollectionsService {
  async list(): Promise<Collection[]> {
    const result = await prisma.collection.findMany({
      where: {
        products: {
          some: {},
        },
      },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
    return result.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      items: item._count.products,
    }));
  }
}