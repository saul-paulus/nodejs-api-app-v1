/**
 * Prisma model tetap didefinisikan di `prisma/schema.prisma`.
 * File ini dipakai untuk mendefinisikan “shape” (select/projection) yang dipakai berulang,
 * terutama untuk memastikan field sensitif (mis. password) tidak ikut ter-return.
 */

export const userPublicSelect = {
  username: true,
  id_personal: true,
  codeuker: true,
  id_wewenang: true,
};
