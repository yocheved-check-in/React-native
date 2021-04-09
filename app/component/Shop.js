import React from "react";
import { Button, Text, View } from "react-native";

const items = [
  {
    id: 1,
    name: "overwatch",
    price: 20,
  },
  {
    id: 2,
    name: "minecraft",
    price: 32,
  },
  {
    id: 3,
    name: "fortnite",
    price: 51,
  },
];

const Shop = () => {
  const [cart, setCart] = React.useState([]);
  const cartTotal = cart.reduce((total, { price = 0 }) => total + price, 0);

  const addToCart = (item) => setCart((currentCart) => [...currentCart, item]);

  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];
    });
  };

  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  const listItemsToBuy = () =>
    items.map((item) => (
      <View key={item.id}>
        <Text>{`${item.name}: $${item.price}`}</Text>

        <Button
          title="Add"
          type="submit"
          onClick={() => addToCart(item)}
        ></Button>
      </View>
    ));

  const listItemsInCart = () =>
    items.map((item) => (
      <View key={item.id}>
        <Text>
          ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`}
        </Text>

        <Button
          title="Remove"
          type="submit"
          onClick={() => removeFromCart(item)}
        ></Button>
      </View>
    ));

  return (
    <View>
      <Text>STORE</Text>
      <View>{listItemsToBuy()}</View>
      <View>
        <Text>CART</Text>
      </View>
      <View>{listItemsInCart()}</View>
      <View>
        <Text>Total: ${cartTotal}</Text>
      </View>
      <View>
        <Button title="Clear" onClick={() => setCart([])}>
          {/* <Text>Clear</Text> */}
        </Button>
      </View>
    </View>
  );
};

export default Shop;
