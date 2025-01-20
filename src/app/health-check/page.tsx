import React from 'react'
import { trpc } from '@/lib/trpc/server'

export default async function HealthCheckPage() {
  const res = await trpc.healthCheck.status()
  return <div>{res}</div>
}
