# Mejoras Sugeridas para Command Runner v2

## Mejoras Adicionales Sugeridas

### 3. Variables de Entorno y Placeholders
**Prioridad: Alta**
- Soporte para variables como `${workspaceFolder}`, `${file}`, `${fileBasename}`
- Ejemplo: `run cd ${workspaceFolder} && npm test`
- Implementación en `Terminal.ts` antes de ejecutar el comando:
  ```typescript
  const workspaceFolder = workspace.workspaceFolders?.[0]?.uri.fsPath;
  command = command.replace('${workspaceFolder}', workspaceFolder || '');
  ```

### 5. Confirmación Antes de Ejecutar
**Prioridad: Media**
- Opción para pedir confirmación antes de ejecutar comandos peligrosos
- Detectar comandos como `rm -rf`, `del`, `format`, etc.
- Configuración: `command-runner.confirmDangerousCommands`

### 6. Soporte para Múltiples Comandos Secuenciales
**Prioridad: Media**
- Ejecutar varios comandos en secuencia
- Sintaxis: `run \`\`\`cmd1 && cmd2 && cmd3\`\`\``
- Ya está parcialmente soportado por la regex actual

### 7. Iconos Personalizables
**Prioridad: Baja**
- Permitir personalizar el icono ▶︎ en el CodeLens
- Configuración: `command-runner.codeLensIcon`
- Opciones: "▶︎", "►", "▶", "⚡", "🚀", "⚙️"

### 8. Notificaciones de Estado
**Prioridad: Baja**
- Mostrar notificación cuando un comando termina
- Útil para comandos largos
- Configuración: `command-runner.showCompletionNotification`

### 12. Decoraciones con Hover Info
**Prioridad: Baja**
- Mostrar información adicional al pasar el mouse sobre el comando
- Ejemplo: última ejecución, tiempo de ejecución promedio

### 13. Soporte para Perfiles de Terminal
**Prioridad: Media**
- Permitir especificar perfiles de terminal (PowerShell, CMD, Git Bash, WSL)
- Sintaxis: `run bash\`ls -la\``
- Ya tienes soporte parcial con el nombre del terminal

### 15. Testing y CI/CD
**Prioridad: Alta**
- Ampliar la suite de tests en `src/test/suite/`
- Añadir tests para decoraciones
- Configurar GitHub Actions para CI/CD automático