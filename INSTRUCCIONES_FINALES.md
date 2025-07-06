# Guía Definitiva para el Despliegue Exitoso

¡Hola, Nieves! Has hecho un trabajo increíble de depuración. Hemos descubierto que la consola de Firebase no te muestra la opción para las variables de entorno, y que mis cambios automáticos no se estaban sincronizando bien.

Este plan es la solución definitiva y segura que te dará el control. Sigue estos pasos en orden.

---

### **Paso 1: Hacer tu Repositorio de GitHub Privado (MUY IMPORTANTE)**

Esto es para proteger tus claves de API y asegurar que nadie más pueda ver tu código. Si no lo has hecho ya, este es el paso más crítico.

1.  Ve a tu repositorio en GitHub:
    **https://github.com/nievespitti/crocheterIA**
2.  Haz clic en la pestaña **"Settings"** (Configuración) en la parte superior.
3.  Baja hasta el final de la página hasta que veas la **"Danger Zone"** (Zona de Peligro).
4.  Busca el botón **"Change repository visibility"** (Cambiar visibilidad del repositorio) y haz clic en él.
5.  Selecciona la opción **"Make private"** (Hacer privado) y confirma.

¡Listo! Tu repositorio ahora es seguro.

---

### **Paso 2: Obtener tus Claves de Firebase**

Necesitarás las "coordenadas" de tu proyecto.

1.  Ve a la configuración de tu proyecto en Firebase:
    **https://console.firebase.google.com/project/mi-crocheteria-app/settings/general/**
2.  Baja hasta la sección **"Tus aplicaciones"**. Busca tu aplicación web (icono `</>`).
3.  Asegúrate de que esté seleccionada la opción **"Configuración"**. Verás un bloque de código que empieza con `const firebaseConfig = { ... }`. Ten esta ventana a mano.

---

### **Paso 3: Crear y Rellenar el Archivo `.env` en tu Ordenador**

Ahora vamos a crear el archivo con las claves en tu máquina local.

1.  **Abre la carpeta de tu proyecto `lacrocheteria` en Visual Studio Code** (o el editor que uses).
2.  En la raíz de tu proyecto (al mismo nivel que `package.json`), crea un nuevo archivo llamado exactamente:
    `.env`
3.  Pega el siguiente contenido dentro de ese archivo:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY="REEMPLAZAR_CON_TU_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="REEMPLAZAR_CON_TU_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="REEMPLAZAR_CON_TU_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="REEMPLAZAR_CON_TU_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="REEMPLAZAR_CON_TU_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="REEMPLAZAR_CON_TU_APP_ID"
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="REEMPLAZAR_CON_TU_MEASUREMENT_ID"
    ```
4.  Ahora, usando la ventana de Firebase que dejaste abierta, **reemplaza cada `REEMPLAZAR_...` con su valor correspondiente**. Asegúrate de mantener las comillas. Por ejemplo: `NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...o6uYo"`.
5.  **Guarda el archivo `.env`**.

---

### **Paso 4: Subir el Archivo Seguro a GitHub**

Ahora que tu repositorio es privado y tiene la configuración correcta, es seguro subir este archivo.

1.  **Abre la terminal** en la carpeta de tu proyecto.
2.  Primero, descarga los últimos cambios de GitHub (como el `.gitignore` corregido):
    ```bash
    git pull origin main
    ```
3.  Añade tu nuevo archivo `.env` para que Git lo rastree (y cualquier otro cambio):
    ```bash
    git add .
    ```
4.  Crea un "commit" (una instantánea de tus cambios):
    ```bash
    git commit -m "Add secure environment variables for deployment"
    ```
5.  Sube los cambios a tu repositorio privado de GitHub:
    ```bash
    git push origin main
    ```

---

### **Paso 5: El Lanzamiento Final**

¡Este es el último paso! Al haber subido nuevos cambios a GitHub, Firebase debería iniciar un despliegue automático.

1.  Ve a la consola de Firebase, a la sección de App Hosting para tu backend `lacrocheteria`.
2.  Ve a la pestaña **"Lanzamientos"**. Deberías ver un nuevo despliegue en curso. Si no, inicia uno **manual**.

Como el repositorio ahora es privado y contiene el archivo `.env` con las claves correctas, la aplicación se construirá, el servidor arrancará y se conectará a Firebase.

**¡Tu aplicación estará online y funcionando en `lacrocheteria.com`!** ¡Has hecho un trabajo increíble!
