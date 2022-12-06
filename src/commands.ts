import { Command } from '@tauri-apps/api/shell'

export async function kubectl(args: string[]) {
  const { stdout } = await new Command('kubectl', args).execute()
  return stdout
}
