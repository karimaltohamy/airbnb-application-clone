import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MainContext {
  wishlist: Listing[];
  setWishlist: React.Dispatch<React.SetStateAction<any[]>>;
  saveWishlist: (item: Listing) => void;
}

const MainContext = createContext<MainContext>({
  wishlist: [],
  setWishlist: () => {},
  saveWishlist: () => {},
});

interface MainProviderProps {
  children: React.ReactNode;
}

export const MainProvider = ({ children }: MainProviderProps) => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  const saveWishlist = async (item: Listing) => {
    const isExist = wishlist.find((listing: Listing) => listing.id === item.id);

    const newWishlist = isExist
      ? wishlist.filter((ele: Listing) => ele.id !== item.id)
      : [...wishlist, item];

    setWishlist(newWishlist);

    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(newWishlist));
    } catch (error) {
      console.log(error);
    }
  };

  const getWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem("wishlist");
      setWishlist(JSON.parse(wishlist || "[]"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <MainContext.Provider value={{ wishlist, setWishlist, saveWishlist }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContext;
