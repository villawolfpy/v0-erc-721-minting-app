# Carbono & Experiencia - Web3 DApp

Una aplicación descentralizada para comercializar tokens de carbono y mintear NFTs de experiencias únicas.

## 🚀 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Configuración de la red
NEXT_PUBLIC_CHAIN_ID=11155111

# RPC Provider (opcional - usa Infura si está disponible)
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_INFURA_API_KEY=tu_api_key_de_infura

# Direcciones de los contratos inteligentes
NEXT_PUBLIC_CARBONO=0x[DIRECCION_DEL_CONTRATO_CARBONO]
NEXT_PUBLIC_EXPERIENCIA=0x[DIRECCION_DEL_CONTRATO_EXPERIENCIA]
```

#### 🔗 Configuración con Infura (Recomendado)

1. **Obtén tu API Key de Infura:**
   - Ve a [infura.io](https://infura.io)
   - Crea una cuenta gratuita
   - Crea un nuevo proyecto
   - Copia tu API Key

2. **Configura la variable de entorno:**
   ```env
   NEXT_PUBLIC_INFURA_API_KEY=tu_api_key_aqui
   ```

3. **Beneficios de usar Infura:**
   - ✅ Mayor estabilidad y velocidad
   - ✅ Mejor rendimiento en producción
   - ✅ Soporte para múltiples redes
   - ✅ Límites más altos de requests

### Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🔧 Funcionalidades

- **Compra de tokens CBO** con ETH
- **Minteo de NFTs de Experiencia** con tokens CBO
- **Panel de administración** para propietarios de contratos
- **Conexión de wallet** con RainbowKit
- **Notificaciones** de transacciones

## 📝 Notas Importantes

- Los contratos inteligentes deben estar desplegados en la red especificada
- Las direcciones de los contratos deben ser válidas y estar configuradas
- La aplicación está configurada para Sepolia por defecto

## 🛠️ Desarrollo

Esta aplicación usa:
- Next.js 15
- React 19
- Wagmi para interacción con Web3
- RainbowKit para conexión de wallets
- Tailwind CSS para estilos
