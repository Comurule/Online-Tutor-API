<h2>Online-Tutor-API-v1||Register API</h2>
<p> The <strong>Register API</strong> enables a user to create a profile in the database.</p>

<code> POST   /register</code>

<div><h3>Parameters</h3>
    <table>
        <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>fullName</td>
            <td>string</td>
            <td>Required. The full name of the user.</td>
        </tr>
        <tr>
            <td>userName</td>
            <td>string</td>
            <td>Required. The preffered username of the user.</td>
        </tr>
        <tr>
            <td>email</td>
            <td>string</td>
            <td>Required. The email address of the user.</td>
        </tr>
        <tr>
            <td>password</td>
            <td>string</td>
            <td>Required. Password to the user account.</td>
        </tr>
        <tr>
            <td>userCategory</td>
            <td>string</td>
            <td>Required. User must choose between <strong>tutor</strong> and <strong>student</strong> depending on the preffered access level.</td>
        </tr>
        <tr>
            <td>schoolCategory</td>
            <td>string</td>
            <td>Required. User must choose from <strong>pry1</strong>, <strong>pry2</strong>, <strong>pry3</strong>, <strong>pry4</strong>, <strong>pry5</strong>, <strong>pry6</strong>, <strong>jss1</strong>, <strong>jss2</strong>, <strong>jss3</strong>, <strong>sss1</strong>, <strong>sss2</strong>, <strong>sss3 </strong> depending on the preffered class.           
            </td>
        </tr>
        <tr>
            <td>subject</td>
            <td>array</td>
            <td>Optional. User can choose the preffered subjects to learn. Always seperate each subject with a comma(,).</td>
        </tr>
    </table>
</div>
<div>
    <h3>Example</h3>
        <pre>fullName:Umechukwu Chibuike
            userName:hello
            email:umebuike@gmail.com
            password:hello
            userCategory: tutor
            schoolCategory:sss3
        </pre>
</div>