<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>
        <Selector
          :options="deliveryOptions"
          :value="deliveryMethod"
          @input="setMethod"
        ></Selector>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <TextInput
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="deliveryPhone"
          @input="setPhone"
        ></TextInput>
      </label>

      <div class="cart-form__address" v-if="!isDeliveryOwn">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <label class="input">
            <span>Улица*</span>
            <TextInput
              name="street"
              :disabled="isDeliveryToSavedAddress"
              :value="deliveryAddress.street"
              @input="setAddressRow('street', $event)"
            ></TextInput>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Дом*</span>
            <TextInput
              name="building"
              :disabled="isDeliveryToSavedAddress"
              :value="deliveryAddress.building"
              @input="setAddressRow('building', $event)"
            ></TextInput>
          </label>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <label class="input">
            <span>Квартира</span>
            <TextInput
              name="flat"
              :disabled="isDeliveryToSavedAddress"
              :value="deliveryAddress.flat"
              @input="setAddressRow('flat', $event)"
            ></TextInput>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Selector, TextInput } from "@/common/components/ui";
import { mapMutations, mapGetters } from "vuex";
import {
  SET_CART_PHONE,
  SET_CART_DELIVERY_METHOD,
  SET_CART_ADDRESS,
  RESET_CART_ADDRESS,
} from "@/store/mutations-types";

export default {
  name: "CartAddress",
  components: { Selector, TextInput },
  data() {
    return {};
  },
  mounted() {
    if (this.authorized && !this.deliveryPhone) {
      this.setPhone(this.userPhone);
    }
  },
  methods: {
    ...mapMutations("Cart", {
      setPhone: SET_CART_PHONE,
      setMethod: SET_CART_DELIVERY_METHOD,
      setAddress: SET_CART_ADDRESS,
      resetAddress: RESET_CART_ADDRESS,
    }),
    setAddressRow(param, val) {
      this.setAddress({ ...this.deliveryAddress, ...{ [param]: val } });
    },
  },
  computed: {
    ...mapGetters("Auth", ["authorized", "addresses", "addressById"]),
    ...mapGetters("Auth", {
      userPhone: "phone",
    }),
    ...mapGetters("Cart", [
      "deliveryMethod",
      "deliveryPhone",
      "deliveryAddress",
    ]),
    deliveryOptions() {
      const res = [
        {
          id: "own",
          name: "Заберу сам",
        },
        {
          id: "new_address",
          name: "Новый адрес",
        },
      ];

      if (this.addresses?.length)
        this.addresses.map((address) =>
          res.push({
            id: "saved_" + address.id,
            name: address.name,
          })
        );

      return res;
    },
    isDeliveryOwn() {
      return this.deliveryMethod === "own";
    },
    isDeliveryToSavedAddress() {
      return (
        this.deliveryMethod !== "own" && this.deliveryMethod !== "new_address"
      );
    },
  },
  watch: {
    deliveryMethod(chosenMethod) {
      if (chosenMethod.startsWith("saved")) {
        const addressId = chosenMethod.split("_")[1];
        const address = this.addressById(addressId);
        this.setAddress(address);
      } else {
        this.resetAddress();
      }
    },
  },
};
</script>

<style scoped></style>
