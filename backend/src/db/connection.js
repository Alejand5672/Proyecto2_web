import fs from 'node:fs'
import path from 'node:path'
import sqlite3 from 'sqlite3'
import { env } from '../config/env.js'

const databaseDirectory = path.dirname(env.databasePath)

if (databaseDirectory !== '.') {
  fs.mkdirSync(databaseDirectory, { recursive: true })
}

export const db = new sqlite3.Database(env.databasePath)

db.run('PRAGMA foreign_keys = ON')

export function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error)
        return
      }

      resolve({
        id: this.lastID,
        changes: this.changes,
      })
    })
  })
}

export function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error)
        return
      }

      resolve(rows)
    })
  })
}

export function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error)
        return
      }

      resolve(row)
    })
  })
}
