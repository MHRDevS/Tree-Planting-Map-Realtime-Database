"use client";

import { useEffect, useState } from "react";
import { ref, onValue, push, set } from "firebase/database";
import { db } from "../lib/firebase";

export default function useLocalStorage() {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Realtime Database se data sunna aur update karna
  useEffect(() => {
    const treesRef = ref(db, "trees");

    const unsubscribe = onValue(treesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Firebase object ko Array mein convert karna
        const formattedTrees = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTrees(formattedTrees);
      } else {
        setTrees([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Firebase Realtime Database mein naya tree save karna
  const addTree = async (treeData) => {
    const treesRef = ref(db, "trees");
    const newTreeRef = push(treesRef);
    await set(newTreeRef, treeData);
  };

  return { trees, addTree, loading };
}