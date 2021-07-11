<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="(dough, i) in pizza.dough"
                :key="dough.name"
                :class="`dough__input dough__input--${dough.typeCode}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="dough.typeCode"
                  class="visually-hidden"
                  :checked="!i"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in pizza.sizes"
                :key="size.name"
                :class="`diameter__input diameter__input--${size.code}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.code"
                  class="visually-hidden"
                  :checked="size.multiplier === 2"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <div class="ingridients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="(sauce, i) in pizza.sauces"
                  :key="sauce.name"
                  class="radio ingridients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.name"
                    :checked="!i"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingridients__filling">
                <p>Начинка:</p>

                <ul class="ingridients__list">
                  <li
                    v-for="ingredient in pizza.ingredients"
                    :key="ingredient.name"
                    class="ingridients__item"
                  >
                    <span :class="`filling filling--${ingredient.code}`">{{
                      ingredient.name
                    }}</span>

                    <div class="counter counter--orange ingridients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--disabled
                          counter__button--minus
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { pizzaNormalizers } from "@/common/helpers";

export default {
  name: "Index",
  data() {
    return {
      pizza: {
        ...pizza,
        dough: pizzaNormalizers.dough(pizza.dough),
        ingredients: pizzaNormalizers.ingredients(pizza.ingredients),
        sizes: pizzaNormalizers.sizes(pizza.sizes),
      },
    };
  },
};
</script>

<style scoped></style>
