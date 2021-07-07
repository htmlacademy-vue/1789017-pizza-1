import _ from "lodash";
import path from "path";

export const pizzaNormalizers = {
  /**
   * Парсим код типа теста из названия картинки,
   * разрабам такого бэка жму руку
   * @param items
   * @returns {unknown[]}
   */
  dough(items = []) {
    return _.map(items, (item) => ({
      ...item,
      typeCode: item.image.match(/dough-(.+)\.svg/i)[1],
    }));
  },

  /**
   * Парсим код типа топпинга из названия картинки,
   * разрабам такого бэка жму руку
   * @param items
   * @returns {unknown[]}
   */
  ingredients(items = []) {
    return _.map(items, (item) => ({
      ...item,
      code: path.basename(item.image, path.extname(item.image)),
    }));
  },

  /**
   * Парсим код типа топпинга из названия картинки,
   * разрабам такого бэка жму руку
   * @param items
   * @returns {unknown[]}
   */
  sizes(items = []) {
    const multiplierToCode = {
      1: "small",
      2: "normal",
      3: "big",
    };

    return _.map(items, (item) => ({
      ...item,
      code: multiplierToCode[item.multiplier],
    }));
  },
};
