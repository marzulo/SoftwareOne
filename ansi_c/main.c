#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <time.h>

bool is_prime(unsigned int x)
{
 if(x<=1) return(false);
 unsigned int q = floor(sqrt((float)x));
 for(unsigned int i=2; i<=q; i++)
 {
    if((x%i)==0) return(false);
 }
 return(true);
}
//---------------------------------------------------------------------------
int count_primes(unsigned int maxN)
{
   unsigned int res=0;
   //fprintf(stdout,"countprime %d\n", maxN);
   for(int i=2; i<=maxN; i++)
   {
   if(is_prime(i)) res++;
   }
   return(res);
}
//---------------------------------------------------------------------------
char * get_appinfo() {
   char *str;

   str = malloc (sizeof (char) * 150);
   memset(str, '\0', 150 * sizeof(char));
   
   strcat(str,"is_Prime Test");

   // Check windows
#if _WIN32 || _WIN64
#if _WIN64
    strcat(str," WIN 64 bits");
#else
    strcat(str," WIN 32 bits");
#endif
#endif

 // Check GCC
 #if __GNUC__
 #if __x86_64__ || __ppc64__
    strcat(str," GCC 64 bits");
 #else
    strcat(str," GCC 32 bits");
 #endif
 #endif

#if defined(_DEBUG)
    strcat(str," Debug");
#else
    strcat(str," Release");
#endif
   fprintf(stdout,"get_appinfo %s\n", str);
   return(str);
}
//---------------------------------------------------------------------------
int main(int argc, char *argv[]) {
    unsigned int start,end,count, tot=0, maxN=1000000;
    char *str;
    //fprintf(stdout,"DECLAROU\n");

    //fprintf(stdout,"MEMORIA 1 %s\n", str);
    str = get_appinfo();

    fprintf(stdout,"VSCode with GCC 8.3.0\n%s\n\nNumber of primes between 0 to %d\n", str, maxN);

    for(int k=0; k<5; k++) {
        start = clock();
        //fprintf(stdout,"clock1 %d\n", start);
        count = count_primes(maxN);
        end = clock();
        //fprintf(stdout,"clock2 %d\n", end-start);
        tot+=end-start;
 
        fprintf(stdout,"Counted %d  Elapsed: %d ms\n", count, end-start);
    }

    fprintf(stdout,"Avarage Elapsed time: %d ms\n", tot/5);

    return(0);
}
