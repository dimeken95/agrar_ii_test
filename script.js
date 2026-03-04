const TELEGRAM_CONFIG = {
  // Вставьте токен вашего Telegram-бота: 123456789:AA...
  botToken: "",
  // Вставьте chat_id: для канала обычно @channel_name, для группы/личного чата -100... или id
  chatId: "",
};

const form = document.getElementById("feedbackForm");
const statusNode = document.getElementById("formStatus");

if (form && statusNode) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !phone) {
      setStatus("Заполните обязательные поля: имя и телефон.", true);
      return;
    }

    if (!TELEGRAM_CONFIG.botToken || !TELEGRAM_CONFIG.chatId) {
      setStatus("Настройте Telegram в файле script.js (botToken и chatId).", true);
      return;
    }

    const text = [
      "Новая заявка с сайта agro.kz.ai",
      "",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Сообщение: ${message || "—"}`,
      `Время: ${new Date().toLocaleString("ru-RU")}`,
    ].join("\n");

    setStatus("Отправка...", false);

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.chatId,
            text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status}`);
      }

      const payload = await response.json();
      if (!payload.ok) {
        throw new Error(payload.description || "Telegram response not ok");
      }

      form.reset();
      setStatus("Спасибо! Ваша заявка успешно отправлена.", false);
    } catch (error) {
      setStatus("Ошибка отправки. Проверьте botToken/chatId и права бота.", true);
      console.error(error);
    }
  });
}

function setStatus(message, isError) {
  statusNode.textContent = message;
  statusNode.style.color = isError ? "#ffd2d2" : "#e8ffef";
}
