import SimpleValidationPage from "../pages/simpe-validation/SimpleValidationPage";
import FormikValidationPage from "../pages/formik-validation/FormikValidationPage";
import FormikSimplifiedValidationPage from "../pages/formik-validation/FormikSimplefiedValidationPage";
import FormikFullSimplifiedValidationPage from "../pages/formik-validation/FormikFullSimplefiedValidationPage";
import ReactHookFormValidationPage from "../pages/react-hook-form-validations/ReactHookFormValidationPage";
import FormikSomeBtnsValidationPage from "../pages/formik-validation/some-btns/FormikSomeBtnsValidationPage";
import SimpleValidationSomeBtnsPage from "../pages/simpe-validation/some-btns/SimpleSomeBtnsValidationPage";

export const publicRoutes = [
    {path: '/', element: (<SimpleValidationPage></SimpleValidationPage>), linkName: 'Домашняя'},
    {path: '/btns', element: (<SimpleValidationSomeBtnsPage/>), linkName: 'ДомашняяBTNS'},
    {path: '/formik', element: (<FormikValidationPage></FormikValidationPage>), linkName: 'Formik'},
    {path: '/formik-btns', element: (<FormikSomeBtnsValidationPage/>), linkName: 'FormikBTN'},
    {path: '/formik-simple', element: (<FormikSimplifiedValidationPage></FormikSimplifiedValidationPage>), linkName: 'FormikSimple'},
    {path: '/formik-simple-full', element: (<FormikFullSimplifiedValidationPage></FormikFullSimplifiedValidationPage>), linkName: 'FormikSimpleFull'},
    {path: '/hook', element: (<ReactHookFormValidationPage></ReactHookFormValidationPage>), linkName: 'Hook'},
    {path: '*', element: (<div>NOT FOUND 404</div>), linkName: null},
]