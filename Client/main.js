import { createApp, ref, onMounted } from 'vue';

// Create the main app component
const App = {
  setup() {
    const items = ref([]);// list to hold the items fetched from the server
    const newItem = ref({ name: '', description: '' });//object to hold the name and description of a new item to be added.
    const selectedItem = ref(null);//Used to hold an item that is selected for editing.
    const apiUrl = 'http://localhost:3000/api/items';

    // Fetch items from the API
    const fetchItems = async () => {
      try {
        const response = await axios.get(apiUrl);
        items.value = response.data;
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    // Create a new item
    const createItem = async () => {
      try {
        const response = await axios.post(apiUrl, newItem.value);//jo v naya value insert hone wala hai usko newItem me rakha hai aur usko .value laga kr uska value access karte hai.
        items.value.push(response.data);//Adds the newly created item to the items array.
        newItem.value = { name: '', description: '' };
      } catch (error) {
        console.error('Error creating item:', error);
      }
    };

    // Update an item
    const updateItem = async () => {
      try {
        const response = await axios.put(`${apiUrl}/${selectedItem.value._id}`, selectedItem.value);
        const index = items.value.findIndex(item => item._id === selectedItem.value._id);//Finds the index of the item being updated.

        items.value[index] = response.data;//Updates the item in the items array with the new data.
        selectedItem.value = null;
      } catch (error) {
        console.error('Error updating item:', error);
      }
    };

    // Delete an item
    const deleteItem = async (id) => {
      try {
        await axios.delete(`${apiUrl}/${id}`);
        items.value = items.value.filter(item => item._id !== id);//Filters out the deleted item from the items array.
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    };

    onMounted(fetchItems);//calls the fetchItems function when the component is first mounted to fetch the items from the server.

    return {
      items,
      newItem,
      selectedItem,
      createItem,
      updateItem,
      deleteItem,
    };
  },
  template: `
        <div>
            <h1>Vue 3 CRUD App</h1>
            
            <h2>Create Item</h2>
            <input v-model="newItem.name" placeholder="Name">
            <input v-model="newItem.description" placeholder="Description">
            <button @click="createItem">Create</button>
            
            <h2>Items</h2>
            <ul>
                <li v-for="item in items" :key="item._id">
                    {{ item.name }} - {{ item.description }}
                    <button @click="selectedItem = { ...item }">Edit</button>
                    <button @click="deleteItem(item._id)">Delete</button>
                </li>
            </ul>
            
            <div v-if="selectedItem">
                <h2>Edit Item</h2>
                <input v-model="selectedItem.name" placeholder="Name">
                <input v-model="selectedItem.description" placeholder="Description">
                <button @click="updateItem">Update</button>
                <button @click="selectedItem = null">Cancel</button>
            </div>
        </div>
    `,
};

// Mount the app
createApp(App).mount('#app');
