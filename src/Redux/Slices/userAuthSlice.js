import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice } from '@reduxjs/toolkit'
import { signUpUser } from '../Reducers/signUpUser'
import { LogInUser } from '../Reducers/LogInUser'
import { LogOutUser } from '../Reducers/LogOutUser'
import { ForgotPasswordUser } from '../Reducers/ForgotPasswordUser'
import { ResetPasswordUser } from '../Reducers/ResetPasswordUser'

const userToken = AsyncStorage.getItem('ACCESS_TOKEN')
  ? AsyncStorage.getItem('ACCESS_TOKEN')
  : null

const initialState = {
  userData: null,
  isCompletingTheirData: false,
  isUserDataComplete: null,
  percentageOfUserDataCompletion: null,
  formStep: 0,
  isLoggedIn: false,
  loading: false,
  error: false,
  userToken,
  recommendedCommunities: []
}

const userAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeSignUp: (state) => {
      state.isCompletingTheirData = false
    },
    comeBackToCompleteUserData: (state) => {
      state.isCompletingTheirData = true
    },
    updateRecommendedCommunities: (state, action) => {
      if (typeof action.payload.recommendedCommunities === 'undefined') {
        console.log('recommendedCommunities is undefined')
      } else {
        state.recommendedCommunities = action.payload.recommendedCommunities
      }
    },
    updateUserData: (state, action) => {
      console.log('Payload received in updateUserData reducer:', action.payload)

      if (typeof action.payload.userData === 'undefined' || typeof action.payload.isUserDataComplete === 'undefined' ||
        typeof action.payload.percentageOfUserDataCompletion === 'undefined') {
        if (typeof action.payload.userData === 'undefined') {
          console.log('action.payload.userData is undefined')
        }
        if (typeof action.payload.isUserDataComplete === 'undefined') {
          console.log('action.payload.isUserDataComplete is undefined')
        }
        if (typeof action.payload.percentageOfUserDataCompletion === 'undefined') {
          console.log('action.payload.percentageOfUserDataCompletion is undefined')
        }
        return state
      }

      return {
        ...state,
        userData: action.payload.userData,
        isUserDataComplete: action.payload.isUserDataComplete,
        percentageOfUserDataCompletion: action.payload.percentageOfUserDataCompletion
      }
    },
    setFormStep: (state, action) => {
      state.formStep = action.payload
    },
    resetFormStep: (state) => {
      state.formStep = 0
    },
    cancelLoading: (state) => {
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = false
        state.isLoggedIn = true
        // state.userData.id = action.payload.id
        const { access_token, userData } = action.payload // eslint-disable-line camelcase
        state.userData = userData
        state.isCompletingTheirData = true
        state.isUserDataComplete = false
        state.percentageOfUserDataCompletion = 1
        state.userToken = access_token // eslint-disable-line camelcase
        state.formStep = 0
        AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(action.payload.access_token))
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(LogInUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(LogInUser.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false
        state.error = false
        state.isLoggedIn = true
        const { access_token, userData, isUserDataComplete, percentageOfUserDataCompletion, recommendedCommunities } = action.payload // eslint-disable-line camelcase
        state.userData = userData
        state.isCompletingTheirData = false
        state.recommendedCommunities = recommendedCommunities
        state.isUserDataComplete = isUserDataComplete
        state.percentageOfUserDataCompletion = percentageOfUserDataCompletion
        state.userToken = access_token // eslint-disable-line camelcase
        state.formStep = 0
        state.userToken = action.payload.access_token
        AsyncStorage.setItem('ACCESS_TOKEN', JSON.stringify(action.payload.access_token))
      })
      .addCase(LogInUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(LogOutUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(LogOutUser.fulfilled, (state) => {
        state.loading = false
        state.error = false
        state.isLoggedIn = false
        state.userData = null
        state.userToken = null
        AsyncStorage.removeItem('ACCESS_TOKEN')
      })
      .addCase(LogOutUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(ForgotPasswordUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(ForgotPasswordUser.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(ForgotPasswordUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
      .addCase(ResetPasswordUser.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(ResetPasswordUser.fulfilled, (state) => {
        state.loading = false
        state.error = false
      })
      .addCase(ResetPasswordUser.rejected, (state) => {
        state.loading = false
        state.error = true
      })
  }
})

export default userAuthSlice.reducer
export const {
  completeSignUp,
  setFormStep,
  resetFormStep,
  updateUserData,
  comeBackToCompleteUserData,
  cancelLoading,
  updateRecommendedCommunities
} = userAuthSlice.actions
