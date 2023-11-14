'use client'
import { useState } from "react";

const defaultItems = [
  {
    name: "mushrooms",
    store: "non-Costco",
    area: "produce",
    checked:false
  },
  {
    name: "frozen berries",
    store: "non-Costco",
    area: "frozen",
    checked: true
  },
  {
    name: "yogurt",
    store: "Costco",
    area: "frozen",
    checked: false
  }
]


export default function Home() {
  defaultItems.sort((a, b) => a.name.localeCompare(b.name));
  const [items, setItems] = useState(defaultItems);
  const [viewSection, setviewSection] = useState('all');
  const [viewChecked, setViewChecked] = useState('all');
  const [viewStore, setViewStore] = useState('all');
  
  const toggleCheckbox = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      checked: !updatedItems[index].checked,
    };
    setItems(updatedItems);
  };

  const uncheckAllItems = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: false,
    }));
    setItems(updatedItems);
  };
  
  const checkAllItems = () => {
    const updatedItems = items.map((item) => ({
      ...item,
      checked: true,
    }));
    setItems(updatedItems);
  };

  return (
    <main className="p-2">
      <div className="fixed flex items-center justify-between top-0 left-0 right-0 bg-gray-600 p-2 h-12 space-x-2">
        {/* Filter by check status */}
        <select
          value={viewChecked}
          onChange={(e) => setViewChecked(e.target.value)}
          className="bg-white border text-gray-700 rounded"
        >
          <option value="all">✅ ❌</option>
          <option value="true">✅</option>
          <option value="false">❌</option>
        </select>
        {/* Filter by section */}
        <select
          value={viewSection}
          onChange={(e) => setviewSection(e.target.value)}
          className="bg-white border text-gray-700 rounded"
        >
          <option value="all">All Sections</option>
          <option value="produce">Produce</option>
          <option value="shelf">Shelves</option>
          <option value="frozen">Frozen</option>
          <option value="non-food">Non-food</option>
        </select>
        {/* Filter by store */}
        <select
          value={viewStore}
          onChange={(e) => setViewStore(e.target.value)}
          className="bg-white border text-gray-700 rounded"
        >
          <option value="all">All Stores</option>
          <option value="Costco">Costco</option>
          <option value="non-Costco">Other</option>
        </select>
        
          
      </div>
      <div className="mt-20">
      {items.map((item, index)=> {
        if
          (
            (viewSection !== 'all' && item.area !== viewSection) || 
            (viewChecked !== 'all' && item.checked !== JSON.parse(viewChecked)) || 
            (viewStore !== 'all' && item.store !== viewStore)
          ) {
          return null; // Skip rendering
        }
        return (
        <div key={index} className="flex items-center justify-between w-full p-2 my-1 border rounded-lg" onClick={() => toggleCheckbox(index)}>
          <label>{item.name}</label>
          <input 
            type="checkbox"
            checked={item.checked}
            onChange={() => toggleCheckbox(index)}
            className="mr-1 w-4 h-4"
          />
        </div>
        );
      })}

      <div className="fixed flex items-center justify-between bottom-0 left-0 right-0 bg-gray-600 p-4 h-12 space-x-2">
        <button onClick={uncheckAllItems}>❌ all</button>
        <button onClick={checkAllItems}>✅ all</button>
      </div>
      </div>
     
    </main>
  )
}
