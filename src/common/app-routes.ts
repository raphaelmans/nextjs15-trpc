export const appRootLevelRoutes = ['signUp', 'signIn', 'index', 'home'] as const

type AppRootLevelRoutes = (typeof appRootLevelRoutes)[number]

const appRoutes = {
  signUp: {
    base: '/sign-up',
    options: {
      type: 'guest',
    },
  },
  signIn: {
    base: '/sign-in',
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
