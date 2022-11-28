import { ROLE } from "./role.js";

export const canViewCoupon = (user, coupon) => {
  return user.role === ROLE.MANAGER || coupon.userId === user.id;
};

export const scopedCoupons = (user, coupons) => {
  if (user.role === ROLE.MANAGER) return coupons;
  return coupons.filter((coupon) => coupon.userId === user.id);
};
