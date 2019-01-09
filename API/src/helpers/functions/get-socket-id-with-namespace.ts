export function getSocketIdWithNamespace(namespace: string, socketId: string) {
  return `/${namespace}#${socketId}`;
}