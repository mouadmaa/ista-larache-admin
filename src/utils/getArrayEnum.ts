import { Level, Year, Group } from '../generated/graphql'

export const levels = Object.entries(Level).map(level => level[1])

export const years = Object.entries(Year).map(year => year[1])

export const groups = Object.entries(Group).map(group => group[1])
