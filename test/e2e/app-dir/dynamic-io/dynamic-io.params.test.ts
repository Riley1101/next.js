import { nextTestSetup } from 'e2e-utils'

const WITH_PPR = !!process.env.__NEXT_EXPERIMENTAL_PPR

// cSpell:words lowcard highcard
describe('dynamic-io', () => {
  const { next, isNextDev, skipped } = nextTestSetup({
    files: __dirname,
    skipDeployment: true,
  })

  if (skipped) {
    return
  }

  let cliIndex = 0
  beforeEach(() => {
    cliIndex = next.cliOutput.length
  })
  function getLines(containing: string): Array<string> {
    const warnings = next.cliOutput
      .slice(cliIndex)
      .split('\n')
      .filter((l) => l.includes(containing))

    cliIndex = next.cliOutput.length
    return warnings
  }

  describe('Async Params', () => {
    if (WITH_PPR) {
      it('should partially prerender pages that await params in a server components', async () => {
        expect(getLines('In route /params')).toEqual([])

        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should partially prerender pages that use params in a client components', async () => {
        expect(getLines('In route /params')).toEqual([])

        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    } else {
      it('should prerender pages that await params in a server component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that `use` params in a client component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // TODO at the moment pages receive searchParams which are not know at build time
          // and always dynamic. We have to pessimistically assume they are accessed and thus
          // we cannot actually produce a static shell without PPR.
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should render pages that await params in a server component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/async/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should render pages that `use` params in a client component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/async/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    }

    it('should fully prerender pages that check individual param keys after awaiting params in a server component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/semantics/one/build/async/layout-has/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/semantics/one/build/async/page-has/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/semantics/one/run/async/layout-has/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is still partially prerendered
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$('/params/semantics/one/run/async/page-has/server')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is still partially prerendered
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }
    })

    it('should fully prerender pages that check individual param keys after `use`ing params in a client component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/semantics/one/build/async/layout-has/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/semantics/one/build/async/page-has/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // When dynamicIO is on and PPR is off the search params passed to a client page
          // are enough to mark the whole route as dynamic. This is because we can't know if
          // you are going to use those searchParams in an update on the client so we can't infer
          // anything about your lack of use during SSR. In the future we will update searchParams
          // written to the client to actually derive those params from location and thus not
          // require dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$(
        '/params/semantics/one/run/async/layout-has/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is still partially prerendered
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$('/params/semantics/one/run/async/page-has/client')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is still partially prerendered
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // When dynamicIO is on and PPR is off the search params passed to a client page
          // are enough to mark the whole route as dynamic. This is because we can't know if
          // you are going to use those searchParams in an update on the client so we can't infer
          // anything about your lack of use during SSR. In the future we will update searchParams
          // written to the client to actually derive those params from location and thus not
          // require dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }
    })

    if (WITH_PPR) {
      it('should partially prerender pages that spread awaited params in a server component', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should partially prerender pages that spread `use`ed params in a client component', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    } else {
      it('should prerender pages that spread awaited params in a server component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that spread `use`ed params in a client component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/async/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/async/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // TODO at the moment pages receive searchParams which are not know at build time
          // and always dynamic. We have to pessimistically assume they are accessed and thus
          // we cannot actually produce a static shell without PPR.
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should render pages that spread awaited params in a server component when not prebuilt', async () => {
        let $ = await next.render$(
          '/params/semantics/one/run/async/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        } else {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        } else {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        }
      })

      it('should render pages that spread `use`ed params in a client component when not prebuilt', async () => {
        let $ = await next.render$(
          '/params/semantics/one/run/async/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        }

        $ = await next.render$(
          '/params/semantics/one/run/async/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
        }
      })
    }
  })

  describe('Synchronous Params access', () => {
    if (WITH_PPR) {
      it('should partially prerender pages that access params synchronously in a server components', async () => {
        expect(getLines('In route /params')).toEqual([])

        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should partially prerender pages that access params synchronously in a client components', async () => {
        expect(getLines('In route /params')).toEqual([])

        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    } else {
      it('should prerender pages that access params synchronously in a server component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that access params synchronously in a client component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          // TODO at the moment pages receive searchParams which are not know at build time
          // and always dynamic. We have to pessimistically assume they are accessed and thus
          // we cannot actually produce a static shell without PPR.
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('build')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should render pages that access params synchronously in a server component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/sync/layout-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-access/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should render pages that access params synchronously in a client component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/sync/layout-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-access/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-lowcard').text()).toBe('one')
          expect($('#param-highcard').text()).toBe('run')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    }

    it('should fully prerender pages that check individual param keys directly on the params prop in a server component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/semantics/one/build/sync/layout-has/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$('/params/semantics/one/build/sync/page-has/server')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$('/params/semantics/one/run/sync/layout-has/server')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is fully prerendered
          // because has-checking doesn't postpone even with ppr fallbacks
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$('/params/semantics/one/run/sync/page-has/server')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is fully prerendered
          // because has-checking doesn't postpone even with ppr fallbacks
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }
    })

    it('should fully prerender pages that check individual param keys directly on the params prop in a client component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/semantics/one/build/sync/layout-has/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at buildtime')
        expect($('#lowcard').text()).toBe('at buildtime')
        expect($('#highcard').text()).toBe('at buildtime')
        expect($('#page').text()).toBe('at buildtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$('/params/semantics/one/build/sync/page-has/client')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // When dynamicIO is on and PPR is off the search params passed to a client page
          // are enough to mark the whole route as dynamic. This is because we can't know if
          // you are going to use those searchParams in an update on the client so we can't infer
          // anything about your lack of use during SSR. In the future we will update searchParams
          // written to the client to actually derive those params from location and thus not
          // require dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$('/params/semantics/one/run/sync/layout-has/client')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is fully prerendered
          // because has-checking doesn't postpone even with ppr fallbacks
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // without PPR the first visit is dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }

      $ = await next.render$('/params/semantics/one/run/sync/page-has/client')
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#lowcard').text()).toBe('at runtime')
        expect($('#highcard').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-has-lowcard').text()).toBe('true')
        expect($('#param-has-highcard').text()).toBe('true')
        expect($('#param-has-foo').text()).toBe('false')
        expect(getLines('In route /params')).toEqual([])
      } else {
        if (WITH_PPR) {
          // With PPR fallbacks the first visit is still fully prerendered
          // has-checking keys isn't dynamic and since we aren't awaiting the
          // whole params object we end up with a complete prerender even
          // for the fallback page.
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        } else {
          // When dynamicIO is on and PPR is off the search params passed to a client page
          // are enough to mark the whole route as dynamic. This is because we can't know if
          // you are going to use those searchParams in an update on the client so we can't infer
          // anything about your lack of use during SSR. In the future we will update searchParams
          // written to the client to actually derive those params from location and thus not
          // require dynamic
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-has-lowcard').text()).toBe('true')
          expect($('#param-has-highcard').text()).toBe('true')
          expect($('#param-has-foo').text()).toBe('false')
          expect(getLines('In route /params')).toEqual([])
        }
      }
    })

    if (WITH_PPR) {
      it('should partially prerender pages that spread params without awaiting first in a server component', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should partially prerender pages that spread params without `use`ing them first in a client component', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#highcard-fallback').text()).toBe(
            'loading highcard children'
          )
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    } else {
      it('should prerender pages that spread params without awaiting first in a server component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that spread params without `use`ing first in a client component when prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/build/sync/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at buildtime')
          expect($('#lowcard').text()).toBe('at buildtime')
          expect($('#highcard').text()).toBe('at buildtime')
          expect($('#page').text()).toBe('at buildtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/build/sync/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          // TODO at the moment pages receive searchParams which are not know at build time
          // and always dynamic. We have to pessimistically assume they are accessed and thus
          // we cannot actually produce a static shell without PPR.
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('build')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that spread params without awaiting first in a server component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/sync/layout-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-spread/server'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })

      it('should prerender pages that spread params without `use`ing first in a client component when not prebuilt', async () => {
        expect(getLines('In route /params')).toEqual([])
        let $ = await next.render$(
          '/params/semantics/one/run/sync/layout-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')

          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }

        $ = await next.render$(
          '/params/semantics/one/run/sync/page-spread/client'
        )
        if (isNextDev) {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([
            expect.stringContaining(
              'enumerated with `{...params}`, `Object.keys(params)`, or similar.'
            ),
            expect.stringContaining('accessed directly with `params.lowcard`'),
            expect.stringContaining('accessed directly with `params.highcard`'),
          ])
        } else {
          expect($('#layout').text()).toBe('at runtime')
          expect($('#lowcard').text()).toBe('at runtime')
          expect($('#highcard').text()).toBe('at runtime')
          expect($('#page').text()).toBe('at runtime')
          expect($('#param-copied-lowcard').text()).toBe('one')
          expect($('#param-copied-highcard').text()).toBe('run')
          expect($('#param-key-count').text()).toBe('2')
          expect(getLines('In route /params')).toEqual([])
        }
      })
    }
  })

  describe('Param Shadowing', () => {
    it('should correctly allow param names like then, value, and status when awaiting params in a server component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/async/layout/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/async/page/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      }
    })

    it('should correctly allow param names like then, value, and status when `use`ing params in a client component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/async/layout/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/async/page/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toBe('bar')
        expect($('#param-value').text()).toBe('baz')
        expect($('#param-status').text()).toBe('qux')
        expect(getLines('In route /params')).toEqual([])
      }
    })

    it('should not allow param names like then, value, and status when accessing params directly in a server component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/sync/layout/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([
          expect.stringContaining(
            'The following properties were not copied: `then`, `value`, , and `status`.'
          ),
          expect.stringContaining('accessed directly with `params.dyn`'),
          expect.stringContaining('accessed directly with `params.dyn`'),
        ])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/sync/page/server'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([
          expect.stringContaining(
            'The following properties were not copied: `then`, `value`, , and `status`.'
          ),
          expect.stringContaining('accessed directly with `params.dyn`'),
          expect.stringContaining('accessed directly with `params.dyn`'),
        ])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([])
      }
    })

    it('should not allow param names like then, value, and status when accessing params directly in a client component', async () => {
      expect(getLines('In route /params')).toEqual([])
      let $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/sync/layout/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([
          expect.stringContaining(
            'The following properties were not copied: `then`, `value`, , and `status`.'
          ),
          expect.stringContaining('accessed directly with `params.dyn`'),
          expect.stringContaining('accessed directly with `params.dyn`'),
        ])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([])
      }

      $ = await next.render$(
        '/params/shadowing/foo/bar/baz/qux/sync/page/client'
      )
      if (isNextDev) {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([
          expect.stringContaining(
            'The following properties were not copied: `then`, `value`, , and `status`.'
          ),
          expect.stringContaining('accessed directly with `params.dyn`'),
          expect.stringContaining('accessed directly with `params.dyn`'),
        ])
      } else {
        expect($('#layout').text()).toBe('at runtime')
        expect($('#page').text()).toBe('at runtime')
        expect($('#param-dyn').text()).toBe('foo')
        expect($('#param-then').text()).toEqual(
          expect.stringContaining('native code')
        )
        expect($('#param-value').text()).toBe('undefined')
        expect($('#param-status').text()).toBe('undefined')
        expect(getLines('In route /params')).toEqual([])
      }
    })
  })
})