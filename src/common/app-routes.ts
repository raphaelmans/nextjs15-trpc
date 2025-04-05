export const appRootLevelRoutes = ['login', 'register', 'index', 'home'] as const

type AppRootLevelRoutes = (typeof appRootLevelRoutes)[number]

const appRoutes = {
  login: {
    base: '/login',
    options: {
      type: 'guest',
    },
  },
  register: {
    base: '/register',
    options: {
      type: 'guest',
    },
  },
  index: {
    base: '/',
    options: {
      type: 'guest',
    },
  },
  home: {
    base: '/home',
    options: {
      type: 'protected',
    },
  },
} as const satisfies {
  [key in AppRootLevelRoutes]: {
    base: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
    options: {
      type: 'guest' | 'protected' | 'docs'
    }
  }
}

export default appRoutes
