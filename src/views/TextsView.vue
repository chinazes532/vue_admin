<template>
    <div class="texts-view">
      <h1>Текст в боте</h1>
      <ul>
        <li v-for="text in texts" :key="text.id" class="text-item">
          <div
            contenteditable="true"
            v-html="text.text"
            class="text-input"
            @input="updateTextContent(text.id, $event)"
            @keydown="handleKeydown"
            placeholder="Введите текст"
          ></div>
          <button @click="saveText(text.id)">Сохранить</button>
        </li>
      </ul>
      <button @click="makeBold">Сделать жирным</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TextsView',
    data() {
      return {
        texts: []
      };
    },
    mounted() {
      this.fetchTexts();
    },
    methods: {
      async fetchTexts() {
        try {
          const response = await axios.get('https://chinazes532-fastapi-admin-4635.twc1.net/texts');
          this.texts = response.data; // Предполагается, что данные приходят в формате [{ id: 1, text: 'Sample text' }, ...]
        } catch (error) {
          console.error('Error fetching texts:', error);
        }
      },
      updateTextContent(id, event) {
        const textToUpdate = this.texts.find(text => text.id === id);
        if (textToUpdate) {
          textToUpdate.text = event.target.innerHTML; // Обновляем текст при изменении
        }
      },
      async saveText(id) {
        try {
          const textToUpdate = this.texts.find(text => text.id === id);
          
          // Убедитесь, что поле text не пустое
          if (!textToUpdate || !textToUpdate.text.trim()) {
            alert('Поле текст должно быть заполнено.');
            return;
          }
  
          // Отправка text как параметр запроса
          const response = await axios.put(`https://chinazes532-fastapi-admin-4635.twc1.net/texts/${id}`, null, {
            params: {
              text: textToUpdate.text // Передаем текст как параметр запроса
            }
          });
  
          if (response.data.ok) {
            alert('Текст обновлен!');
          } else {
            alert('Не удалось обновить текст.');
          }
        } catch (error) {
          console.error('Error updating text:', error);
          // Выводим дополнительную информацию об ошибке
          if (error.response && error.response.data) {
            console.error('Server response:', error.response.data);
            alert('Ошибка при обновлении текста: ' + JSON.stringify(error.response.data));
          }
        }
      },
      handleKeydown(event) {
        // Позволяем пользователю использовать Enter для добавления новой строки
        if (event.key === 'Enter') {
          event.preventDefault(); // Предотвращаем стандартное поведение
          document.execCommand('insertHTML', false, '<br><br>'); // Вставляем перенос строки
        }
      },
      makeBold() {
        document.execCommand('bold'); // Применяем жирный шрифт к выделенному тексту
      }
    }
  };
  </script>
<style scoped>
.texts-view {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.text-item {
  margin-bottom: 10px;
}

.text-input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-height: 40px; /* Минимальная высота для текстового поля */
  width: 300px; /* Ширина текстового поля */
  outline: none; /* Убираем обводку при фокусе */
}

.text-input:focus {
  border-color: #28a745; /* Цвет рамки при фокусе */
}

button {
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

h1 {
  text-align: center;
}
</style>
