import { kebab } from './utils'

/**
 * Runs the `init` method on each module passed.
 * - Passes elements which match the component name.
 * - Each element must have a `data-component` attribute.
 * - Value must be handelized version of component name.
 * @param {object} components - The components to mount.
 * @param {element} container - Optional container, defaults to document.
 * 
 */
export function mount(components = {}, container = document) {
  Object.keys(components).forEach((key) => {
    const handle = kebab(key)
    const selector = `[data-component="${handle}"]`

    container.querySelectorAll(selector).forEach((node) => {
      components[key]({ node, refs: getRefs(node) }).init()
      node.removeAttribute('data-component')
    })
  })
}

/**
 * Returns the references found in a container.
 * @param {element} container - The container element.
 * @returns {object}
 */
export function getRefs(container) {
  const refs = {}

  /**
   * Find any references and attach them.
   * - Builds array if multiple refs found.
   */
  container.querySelectorAll('*').forEach((ref) => {
    const parent = ref.closest('[data-component]')

    if (parent) {
      const parentNamespace = parent.dataset.component
      const containerNamespace = container.dataset.component

      if (parentNamespace !== containerNamespace) {
        return
      }
    }

    if (ref.dataset.ref) {
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
    }
  })

  return refs
}
