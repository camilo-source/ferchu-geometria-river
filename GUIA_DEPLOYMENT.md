# 🚀 Guía de Deployment: GitHub + Vercel

## Estado Actual ✅

- ✅ Git inicializado
- ✅ Primer commit realizado
- ✅ README.md creado
- ✅ .gitignore configurado
- ✅ Código listo para deployment

---

## 📋 Paso 1: Crear Repositorio en GitHub

### Opción A: Desde GitHub.com (Recomendada)

1. **Ve a GitHub**: https://github.com/new

2. **Configura el repositorio**:
   ```
   Repository name: ferchu-geometria-river
   Description: 🎓 Plataforma educativa de geometría con temática River Plate (TDAH-friendly)
   Visibility: ✅ Public (o Private si prefieres)
   ❌ NO marques "Initialize with README" (ya lo tenemos)
   ```

3. **Crea el repositorio** → Clic en "Create repository"

4. **Copia la URL del repositorio** que aparecerá, algo como:
   ```
   https://github.com/TU_USUARIO/ferchu-geometria-river.git
   ```

### Opción B: Usando GitHub CLI (si la tienes instalada)

```bash
gh repo create ferchu-geometria-river --public --source=. --remote=origin --push
```

---

## 📤 Paso 2: Subir Código a GitHub

### Si usaste Opción A (manual):

Ejecuta estos comandos en tu terminal:

```bash
# Configurar el remote (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/ferchu-geometria-river.git

# Verificar que se agregó correctamente
git remote -v

# Subir el código (la primera vez)
git branch -M main
git push -u origin main
```

### Si usaste Opción B (GitHub CLI):
Ya está subido automáticamente 🎉

---

## 🌐 Paso 3: Deploy en Vercel

### 3.1 Crear cuenta en Vercel (si no tienes)

1. Ve a: https://vercel.com/signup
2. Elige "Continue with GitHub"
3. Autoriza Vercel a acceder a tus repositorios

### 3.2 Importar el Proyecto

1. **Dashboard de Vercel**: https://vercel.com/new

2. **Importar desde GitHub**:
   - Busca: `ferchu-geometria-river`
   - Clic en "Import"

3. **Configuración del Proyecto**:
   ```
   Project Name: ferchu-geometria-river
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build (auto-detectado)
   Output Directory: dist (auto-detectado)
   Install Command: npm install (auto-detectado)
   ```

4. **Deploy**: Clic en "Deploy"

### 3.3 Esperafrecuentes el Deployment

Vercel construirá tu proyecto automáticamente:
- ⏳ Instalar dependencias (~30 segundos)
- ⏳ Build de producción (~1 minuto)
- ✅ Deploy en CDN global

### 3.4 ¡Listo!

Vercel te dará una URL como:
```
https://ferchu-geometria-river.vercel.app
```

O puedes configurar un dominio personalizado.

---

## 🔄 Workflow de Desarrollo

### Para futuros cambios:

```bash
# 1. Hacer cambios en el código
# 2. Revisar cambios
git status

# 3. Agregar archivos modificados
git add .

# 4. Crear commit con mensaje descriptivo
git commit -m "✨ Descripción del cambio"

# 5. Subir a GitHub
git push

# 6. Vercel auto-deploya automáticamente 🚀
```

**Vercel detecta cada push y deploya automáticamente.**

---

## 📊 Configuración Avanzada de Vercel (Opcional)

### Variables de Entorno

Si necesitas agregar variables de entorno:
1. Ve al Dashboard de Vercel
2. Proyecto → Settings → Environment Variables
3. Agrega las variables necesarias

### Dominios Personalizados

1. Proyecto → Settings → Domains
2. Agrega tu dominio personalizado
3. Configura DNS según las instrucciones

### Analytics

Vercel ofrece analytics gratuitas:
- Proyecto → Analytics
- Web Vitals automáticos
- Métricas de rendimiento

---

## ✅ Checklist Final

Antes de compartir la URL:

- [ ] ✅ Repositorio en GitHub accesible
- [ ] ✅ Deployment en Vercel exitoso
- [ ] ✅ URL funcional (probada)
- [ ] ✅ Todas las imágenes cargan correctamente
- [ ] ✅ Navegación funciona
- [ ] ✅ Responsive en móvil/tablet
- [ ] ✅ README actualizado con URL de demo

---

## 🐛 Troubleshooting

### Error: "Build failed"

Posibles causas:
- Verificar que `package.json` tenga `"build": "vite build"`
- Verificar que todas las dependencias estén en `package.json`

**Solución**:
```bash
# Probar build local primero
npm run build

# Si funciona local, el problema es de configuración en Vercel
```

### Error: "Page not found" después de deploy

- Vercel busca en `/dist/index.html`
- Verificar que el build genere archivos en `/dist`

### Imágenes no cargan en producción

- Verificar rutas relativas en código
- Las imágenes en `/public` deben usarse como `/assets/...`
- No usar rutas absolutas tipo `C:\Users\...`

---

## 📝 Comandos de Referencia Rápida

### Git
```bash
git status              # Ver cambios
git add .               # Agregar todos los cambios
git commit -m "mensaje" # Crear commit
git push                # Subir a GitHub
git log --oneline       # Ver historial
```

### npm
```bash
npm run dev             # Servidor desarrollo
npm run build           # Build producción
npm run preview         # Preview build local
```

### Vercel CLI (Opcional)
```bash
npm i -g vercel         # Instalar Vercel CLI
vercel                  # Deploy desde terminal
vercel --prod           # Deploy a producción
```

---

## 🎯 Próximos Pasos

1. **Ejecutar los comandos de Git** para subir a GitHub
2. **Importar en Vercel** desde el dashboard
3. **Compartir la URL** con quien quieras
4. **Actualizar README.md** con la URL de producción

---

## 📧 Soporte

Si tienes problemas:
- **GitHub Docs**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/

---

**¡Tu app estará en producción en menos de 5 minutos!** 🚀⚽

---

*Creado con ❤️ para Ferchu - Academia de Arqueros River*
