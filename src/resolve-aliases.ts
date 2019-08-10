import moduleAlias from "module-alias"
import path from "path"

const resolver = () => {
  moduleAlias.addAliases({
    modules: path.resolve(__dirname, "modules")
  })
}

export default resolver()