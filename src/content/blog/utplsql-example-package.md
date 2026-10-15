---
title: "utPLSQL - Example Package"
pubDate: 2020-04-22
author: "Tobias Arnhold"
description: "A few months ago I got an awesome task to do inside the fabe project:"
tags: ["apex", "beginners", "utplsql"]
source: "https://apex-at-work.blogspot.com/2020/04/utplsql-example-package.html"
lang: "en"
---

A few months ago I got an awesome task to do inside the [fabe](https://fab.earth/) project:  
"Create an utPLSQL test package for the app authentication package"  
  
Well, I never used utPLSQL before and (due to some hangovers at conferences 🥴) I could never really get a heads up towards that topic. Luckily I know one of the main developers Samuel Nitsche. He claims to be a Sith Lord, but for me, he is a true Jedi.  
Anyway, I used the force to get him to help me getting a foot into that topic.  
  
First, he gave me some resources.  
  
Documentation:   
<http://utplsql.org/utPLSQL/latest/>   
  
My personal favorite was this article he wrote for the DOAG magazine:  
[**https://cleandatabase.wordpress.com/2019/12/18/but-that-worked-yesterday-or-why-you-should-test-with-utplsql/**](https://cleandatabase.wordpress.com/2019/12/18/but-that-worked-yesterday-or-why-you-should-test-with-utplsql/)   
[(German version: https://www.doag.org/formes/pubfiles/11888853/06\_2019-Red\_Stack-Samuel\_Nitsche-Aber\_das\_hat\_gestern\_noch\_funktioniert\_Testing\_mit\_utPLSQL.pdf)](https://www.doag.org/formes/pubfiles/11888853/06_2019-Red_Stack-Samuel_Nitsche-Aber_das_hat_gestern_noch_funktioniert_Testing_mit_utPLSQL.pdf)   
  
A slide that explains the basic usage:  
![](/blog/utplsql-example-package/bild-1.png)  
  
After a little private introduction I made my first attempt and had a discussion with the other Fabe team members about the code usage and naming rules. Well naming rules sounds harsh and we had a long discussion on the topic. Why? Because it is a damn important thing with several long-term consequences. Finally we as a team decided to do it like this:  
  
Test package name should be the same as the original package with an additional "test\_" prefix.   
For the AUTHENTICATION\_PKG the corresponding utPLSQL package was called: TEST\_AUTHENTICATION\_PKG.  
  
More important were the names for the procedures:  
They should be as descriptive as possible. Luckily, fabe runs on  Oracle 19c and we don't have  a 30 character limitation.  
For example:  
  try\_to\_hijack\_another\_users\_automatic\_login   
  send\_a\_mail\_with\_the\_request\_to\_reset\_the\_password  
  
**The big advantage - compared to having test methods named after the test methods - is that you focus on the task / behavior and you can have as many test cases for one single procedure as necessary.**  
  
So lets get to the code..  
  
The package header looked like this:  
Info: This code piece does not include the complete test case for my package.  

```sql
create or replace package test_authentication_pkg is
  -- %suite(Testing authentication logic)
  -- %suitepath(Authentication)
  -- %rollback(manual)
 
  -- run code:
  -- select * from table(ut.run('test_authentication_pkg'));

  -- %beforeall
  procedure generate_a_valid_apex_session;

  -- %beforeeach
  procedure create_a_test_user_in_user_profile;

  -- %context(Running side programms)
     -- %name(1_simple_procedures)
   
    -- %test(generate a hash value and check the output)
    procedure generate_a_hash_value_and_check_the_output;
   
    -- %test(check the email format of the test_user)
    procedure check_email_format_of_the_test_user;

  -- %endcontext

  -- %context(Authentication checks)
     -- %name(2_login_procedures)
   
    -- %test(verify a positive authentication)
    procedure verify_a_positive_authentication;
   
    -- %test(verify an authentication failure)
    procedure verify_an_authentication_failure;
   
    -- %test(generate a user login token)
    procedure generate_a_user_login_token;

  -- %endcontext
 
  -- %aftereach
  procedure remove_test_user;

end test_authentication_pkg;
```

  
I used a beforeall as well as a beforeeach process to setup my test case.  
By using those annotations the procedures run automatically before the test cases (once / always).  
  
The beforeall process created a valid APEX session which required a commit inside my test procedure. For that fact I had to manually clean up all test content and I had to use %rollback(manual)to get the package running.  
  
I also used %context to be able to better organize my procedures.  
  
Be aware that utPLSQL runs procedures not in a certain way as you defined it. That is the reason why I always recreate the test user and cleanup all data after each test procedure.  
utPLSQL is intended to work like that. To check each test case independent from another one.   
  
My package body looked like this.  

```sql
create or replace package body test_authentication_pkg is
  -- global variables
  gc_user_id constant number := -1;
  gc_app_user constant varchar2(100) := 'uttest.authentication_pkg@fab.earth';
  gc_salt constant varchar2(100) := 'XYZ1235';
  gc_username constant varchar2(100) := 'uttest';
  gc_password constant varchar2(100) := 'ThisIsAValidTest';
  gc_password_hash constant varchar2(100) := 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; 
   
  gc_creation_date constant date := to_date(to_char(localtimestamp,'dd.mm.yyyy') || ' 00:01', 'dd.mm.yyyy hh24:mi');

  --
  -- startup once before all procedures
  --
  procedure generate_a_valid_apex_session as
    l_user_id_in_session_state number;
  begin
    remove_test_user;
   
    apex_session.create_session(
      p_app_id => 100,
      p_page_id => 1,
      p_username => gc_app_user
    );
   
    APEX_UTIL.SET_SESSION_STATE (
        P_NAME => 'G_USER_ID',
        P_VALUE => gc_user_id
    );

    l_user_id_in_session_state := APEX_UTIL.GET_SESSION_STATE (
                p_item => 'G_USER_ID'
              );

    --check
    ut.expect(l_user_id_in_session_state)
      .to_equal(gc_user_id);

  end generate_a_valid_apex_session;
 

  --
  -- preparation: insert into user_table
  --
  procedure create_a_test_user_in_user_table as

    -- populate expected
    l_user_id_entries number;

  begin

    INSERT INTO user_table(
      user_id,
      app_user,
      active,
      username,
      first_name,
      last_name,
      bio,
      timezone_id,
      country_id,
      salt,
      password
    )VALUES(
      gc_user_id,
      gc_app_user,
      'Y',
      gc_username,
      'UT',
      'Test',
      'Internal test account which should not exist regularly.',
      168, -- Berlin
      86, -- Germany
      gc_salt,
      gc_password_hash --'ThisIsAValidTest'
    );

    select count(*)
    into l_user_id_entries
    from user_table
    where user_id = gc_user_id;

    --check
    ut.expect(l_user_id_entries).to_equal(1);

  end create_a_test_user_in_user_table;
 
  --
  -- cleanup from user_table
  --
  procedure remove_test_user as

    -- populate expected
    l_user_id_entries number;

  begin

    delete from user_pw_table
    where email_address = gc_app_user;
   
    delete
    from user_log_table
    where user_id = gc_user_id;

    delete
    from user_table
    where user_id = gc_user_id;

  end remove_test_user;

  --
  --
  -- Simple procedure checks
  --
  --

  PROCEDURE generate_a_hash_value_and_check_the_output IS
  BEGIN
      ut.expect(authentication_pkg.cust_hash(gc_app_user,gc_salt,gc_password))
        .to_equal(gc_password_hash);
  END;

  PROCEDURE check_email_format_the_test_user IS
  BEGIN
      ut.expect(authentication_pkg.email_format(p_email => gc_app_user))
        .to_be_true();
  END;

  --
  --
  -- Login tests
  --
  --

  PROCEDURE verify_a_positive_authentication IS
  BEGIN
      ut.expect(authentication_pkg.custom_authenticate(gc_app_user,gc_password))
        .to_be_true();
  END;

  PROCEDURE verify_an_authentication_failure IS
  BEGIN
      ut.expect(authentication_pkg.custom_authenticate(gc_app_user,gc_password||'X'))
        .to_be_false();
  END;

  -- Create an user login entry / token and create JWT SSO Token as cookie
  PROCEDURE generate_a_user_login_token IS
      l_actual   number;
     
      l_owautil_var owa.vc_arr;
      l_owautil_val owa.vc_arr;
  BEGIN
     
      -- Pre Test configuration
      -- intialize owautil for the generate_fingerprint procedure
      -- to prevent ORA-06502, ORA-06512: at "SYS.OWA_UTIL", line 354
      l_owautil_var(1) := 'HTTP_USER_AGENT';
      l_owautil_val(1) := 'Windows 10 Client with Firefox xxx.x';     
      owa.init_cgi_env( l_owautil_var.count, l_owautil_var, l_owautil_val );

      -- start test case
      authentication_pkg.generate_user_log (
        p_user_id => gc_user_id
      );
             
      -- verifiy user_log_table entry   
      select count(*)
      into l_actual
      from user_log_table
      where user_id = gc_user_id;

      ut.expect(l_actual).to_equal(1);
     
      -- remove test data
      delete from user_log_table
      where user_id = gc_user_id;
     
  END generate_a_user_login_token;

end test_authentication_pkg;
```

  
Now there is a lot to say about that package body let me start with the obvious.  
  
1. I used global variables for all of the values my  test case procedures rely on.  
Advantage: Saves time when I need to adjust the parameters. It is also more readable by using understandable variable names.  
  
2. Use the API and keep the test case simple  
Use the predefined API procedures.   
ut.expect(...).to\_be\_true();  
ut.expect(...).to\_equal(1);  
ut.expect(...).to\_equal(gc\_user\_id);   
  
A common way writing the test cases are looking similar to this example:  

```sql
procedure test_action as
  l_actual number;
  -- populate expected
  l_expected number := 1;

begin
    l_actual := authentication_pkg.check_something(gc_app_user);
    ut.expect(l_actual).to_equal(l_expected);
end test_action;
```

I would recommend to do it like this:
  

```sql
procedure test_action as
begin
    ut.expect(authentication_pkg.check_something(gc_app_user))
      .to_equal(1);
end test_action;
```

  
Advantage:  
Use the proper variable names instead of generic ones.  
By splitting the procedure call and the result check in two lines. We can read it much better.  
By adding the target procedure inside ut\_expect, we spare an additional variable, create almost zero code and still keep the test readable.  
Thanks to Samuel for showing me to code like this.  
  
4. Use a custom APEX session procedure  
Advantage:
Independent code pieces like this should be extracted into separate
procedures (separation of concerns). In that case you can focus on the
real test case errors.  
  
5.  Define your cleanup process  
In my example remove\_test\_user I manually removed all data because in the original package I had some commits inside my called procedures. If you don't have that situation, instead you can  define a simple rollback process.  

```sql
procedure remove_test_user as

begin
  rollback;

end remove_test_user;
```

  
6. Error ORA-06502, ORA-06512: at "SYS.OWA\_UTIL"  
      l\_owautil\_var(1) := 'HTTP\_USER\_AGENT';  
      l\_owautil\_val(1) := 'Windows 10 Client with Firefox xxx.x';        
      owa.init\_cgi\_env( l\_owautil\_var.count, l\_owautil\_var, l\_owautil\_val );  
Why? You need to pretend to be a client. :) Otherwise it will be null.  
  
The result for the real procedure looks like this:  
authentication  
  Testing authentication logic  
    Password checks  
      reset the test user password [,041 sec]  
      send a mail with the request to reset the password [,107 sec]  
      verify the requested password activity [,025 sec]  
      verify the signup password [,019 sec]  
    Authentication checks  
      verify a positive authentication [,055 sec]  
      verify an authentication failure [,069 sec]  
      generate a user login token [,084 sec]  
      automatically recreate an apex session for the test user [,26 sec]  
      try to hijack another users automatic login [,238 sec]  
    Running side programms  
      generate a hash value and check the output [,053 sec]  
      check the email format from the test\_user [,036 sec]  
  
Finished in 1,076257 seconds  
11 tests, 0 failed, 0 errored, 0 disabled, 0 warning(s)  
  
  
Thanks again Samuel, Hayden and the whole Fabe team making this blog post possible.  
It showed me once more what community spirit really meant.
