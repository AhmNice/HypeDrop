import express from 'express'
import {  emailVerification, sendAuthenticatedAccount, updateProfile, updateProfilePicture, userForgotPassword, userLogin, userLogout, userRegistration, userResetPassword  } from '../controller/user.controller.js'
import { verifyUserToken } from '../middleware/verifyToken.js'
import { checkAuth } from '../middleware/checkAuth.js'
import { createSnippet, deleteSnippet, getAllSnippets, getArtistSnippet, getSnippet, updateSnippet, updateSnippetLinks } from '../controller/snippet.controller.js'
import { verifyUser } from '../middleware/verifyUser.js'
import { updateStreams } from '../controller/stream.controller.js'
import { trending } from '../utils/trendingSnippets.js'
import { getUserNotifications, markNotificationAsRead } from '../controller/notification.controller.js'
import { upload } from '../config/multerConfig.js'
import { profilePictureUpload } from '../middleware/profileUploader.js'

const router = express.Router()

router.post('/signup', userRegistration)
router.post('/login', userLogin)
router.post('/account-verification', emailVerification);
router.post('/forget-password',userForgotPassword)
router.post('/reset-password', userResetPassword);
router.post('/logout', userLogout)
router.get('/authenticatedAccount',verifyUserToken,checkAuth,sendAuthenticatedAccount)
router.get('/trending',verifyUserToken,trending)
router.post('/get-snippet', getSnippet)
router.post('/streams', verifyUserToken, checkAuth, updateStreams)
router.post('/streams-guest',  updateStreams)
router.post('/create-snippet', verifyUserToken, checkAuth, upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 }
  ]), createSnippet )
router.post('/snippets/me', verifyUserToken, verifyUser, checkAuth,getArtistSnippet)
router.get('/snippets/all-snippet',getAllSnippets)
router.post('/update-snippets/me', verifyUserToken, verifyUser, checkAuth,updateSnippet)
router.post('/snippet/delete-snippet', verifyUserToken, verifyUser, checkAuth,deleteSnippet)
router.post('/snippet/update-link', verifyUserToken, verifyUser, checkAuth,updateSnippetLinks)
router.post('/me/update-profilePicture', verifyUserToken, upload.single('profilePicture'), profilePictureUpload)
router.post('/me/update-profile', verifyUserToken,  updateProfile)
router.post('/me/get-notification', verifyUserToken, getUserNotifications)
router.post('/me/read-notification', verifyUserToken, markNotificationAsRead)
export default router