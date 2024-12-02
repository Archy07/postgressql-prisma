import { Variant } from '@repo/schemas';
import { prisma } from '../../lib/PrismaClient';

export class VariantsService {
  // Agregar el filtro por productId
  async list(productId?: number): Promise<Variant[]> {
    const where: any = {};

    if (productId) {
      where.productId = productId;  // Si se pasa un productId, lo agregamos al filtro
    }

    const result = await prisma.variant.findMany({
      where,  // Aplicamos el filtro de productId si existe
    });

    return result.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      price: Number(item.price),
      productId: item.productId,
    }));
  }
}