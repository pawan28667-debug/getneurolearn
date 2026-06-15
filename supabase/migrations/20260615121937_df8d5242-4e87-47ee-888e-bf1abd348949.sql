CREATE POLICY "Users delete own lessons"
ON public.lessons FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

GRANT DELETE ON public.lessons TO authenticated;