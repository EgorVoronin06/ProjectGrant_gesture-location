import { browser } from '$app/environment';
import {
	countCombosSum,
	countProductsSum,
	type CouponsDto,
	type CreateOrderDTO,
	type ItemProductDTO,
	type OrderComboItemDTO
} from '@ddsgt_mono/lib';
import { writable, derived, get } from 'svelte/store';
import { OrdersApi } from '../plugins/api/modules/orders';
import { notification } from './notifyStore';

export const orderStore = writable<
	Partial<Omit<CreateOrderDTO, 'items'>> & { items: CreateOrderDTO['items'] }
>({
	comment: undefined,
	needDelivery: true,
	deliveryPrice: undefined,
	deliveryInfo: undefined,
	items: [],
	name: undefined,
	phone: undefined,
	pickPointId: undefined,
	discount: undefined
});

export function clearOrderStore() {
	orderStore.set({
		comment: undefined,
		needDelivery: true,
		deliveryPrice: undefined,
		deliveryInfo: undefined,
		items: [],
		name: undefined,
		phone: undefined,
		pickPointId: undefined,
		discount: undefined
	});
	if (browser) {
		sessionStorage.clear();
	}
}

if (browser) {
	const data = sessionStorage.getItem('order');
	if (data) {
		orderStore.set(JSON.parse(data));
	}
}

export const orderPrice = derived(orderStore, (store) => {
	const products = store.items.filter((i) => i.type === 'product');
	const combos = store.items.filter((i) => i.type === 'combo');
	const productsSum = countProductsSum(products);
	const combosSum = countCombosSum(combos);

	let sum = productsSum + combosSum;
	if (store.discount) {
		sum = Math.round(sum - sum * (store.discount.value / 100));
	}
	return sum;
});

export const orderPriceWithDelivery = derived(orderStore, (i) => {
	let price = get(orderPrice);

	if (i.deliveryPrice !== undefined) {
		price += i.deliveryPrice;
	}
	return price;
});

export function addDiscount(coupon: CouponsDto) {
	orderStore.update((i) => {
		i.discount = { couponId: coupon.id, couponName: coupon.value, value: coupon.discount };
		return i;
	});
}

export function removeDiscount() {
	orderStore.update((i) => {
		i.discount = undefined;
		return i;
	});
}

export async function countDelivery() {
	const storeData = get(orderStore);
	const price = get(orderPrice);
	if (storeData.deliveryInfo) {
		const location: [number, number] = [
			parseFloat(storeData.deliveryInfo.location[0]),
			parseFloat(storeData.deliveryInfo.location[1])
		];
		const orderApi = new OrdersApi(fetch);

		const res = await orderApi.countDeliveryPrice(location, price);
		orderStore.update((i) => {
			i.deliveryPrice = res;
			return i;
		});
	}
}

export function addItem(item: ItemProductDTO | OrderComboItemDTO) {
	orderStore.update((i) => {
		i.items.push(item);
		return i;
	});
	countDelivery();
	notification.success(
		`Товар "${item.type === 'product' ? item.productName : item.name}" добавлен в корзину!`
	);
}

export function updateItemAmount(idx: number, amount: number) {
	orderStore.update((i) => {
		const product = i.items[idx];
		if (product && product.type === 'product') {
			product.amount = amount;
		}
		return i;
	});
	countDelivery();
}

export function removeItem(idx: number) {
	orderStore.update((i) => {
		i.items.splice(idx, 1);
		return i;
	});
	countDelivery();
	notification.success(`Товар удален из корзины!`);
}

orderStore.subscribe((i) => {
	if (browser) {
		sessionStorage.setItem('order', JSON.stringify(i));
		if (i.deliveryInfo === undefined) {
			i.deliveryPrice = undefined;
		}
		if (i.items.length === 0) {
			i.deliveryPrice = undefined;
			i.deliveryInfo = undefined;
		}
	}
});
