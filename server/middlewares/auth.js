'use strict'

import expressJwt from 'express-jwt'
import { jwtSecret } from '../../config'

export default expressJwt({ secret: jwtSecret })
