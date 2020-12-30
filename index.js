import { kebab } from './utils'

/**
 * Runs the `init` method on each module passed.
 * - Passes elements which match the component name.
 * - Each element must have a `data-component` attribute.
 * - Value must be handelized version of component name.
 * @param {object} components - The components to mount.
 * 
 */
export function mount(components = {}) {
  Object.keys(components).forEach((key) => {
    const handle = kebab(key)
    const selector = `[data-component="${handle}"]`

    document.querySelectorAll(selector).forEach((node) => {
      const refs = {}

      node.removeAttribute('data-component')

      /**
       * Find any references and attach them.
       * - Builds array if multiple refs found.
       */
      node.querySelectorAll('[data-ref]').forEach((ref) => {
        let exists = refs[ref.dataset.ref]
        const isArray = Array.isArray(exists)

        if (!!exists) {
          if (isArray) {
            refs[ref.dataset.ref]
              .push(ref)

          } else {
            refs[ref.dataset.ref] =
              [exists, ref]
          }

        } else {
          refs[ref.dataset.ref] = ref
        }

        ref.removeAttribute('data-ref')
      })

      components[key]({ node, refs }).init()
    })
  })
}
